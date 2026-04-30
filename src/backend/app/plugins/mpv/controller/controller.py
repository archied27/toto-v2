"""
handles logic for mpv plugin
"""

from app.plugins.mpv.controller.db import MPVDb
from app.plugins.mpv.controller.mpv_socket_controller import MPVSocket
from app.plugins.mpv.controller.tmdb_controller import TMDBApiController
from app.core.core import Core
from app.core.background_worker import Task
import subprocess
import json
import os

class MPVController:
    def __init__(self, core: Core):
        self.core = core
        self.db = MPVDb(self.core.db_manager)
        self.socket_manager = MPVSocket("/tmp/mpvsocket")

    async def setup(self):
        with open("app/plugins/mpv/config.json", "r") as json_f:
            data = json.load(json_f)

        self.tmdb = TMDBApiController(data["tmdb-api-key"])
        self.movie_dirs = data["movie-dirs"]
        self.series_dirs = data["series-dirs"]

        self.core.bg_worker.register_handler("mpv.add_movies", self.get_movies)
        self.core.bg_worker.register_handler("mpv.add_series", self.get_series)

        await self.db.initialise_db()

    async def update_db(self):
        """
        syncs the database with files on computer
        background task
        """
        await self.core.bg_worker.add_task("mpv.add_series")
        #await self.core.bg_worker.add_task("mpv.add_movies")

    def toggle_pause(self):
        """
        toggles pause status and does nothing if nothing being played
        """
        current = self.socket_manager.get_pause_status()
        if current != None:
            self.socket_manager.set_pause(not current)

    def play(self, file_path: str, duration: int):
        subprocess.Popen(["mpv", f"start={duration}", file_path, "-fs", f"--input-ipc-server={self.socket_manager.socket}"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)

    async def get_being_played(self):
        """
        returns details about currently playing
        """

        file = self.socket_manager.get_current_file()
        if file != None:
            details = await self.db.get_details_from_path(file)
            if details["type"] == "movie":
                data = await self.db.get_movie(details["id"])

                return {"media_type": "movie",
                "title": data["title"], "release_year": data["release_date"].year,
                "progress_seconds": data["progress_seconds"], "poster_path": data["poster_path"]}

            elif details["type"] == "episode":
                data = await self.db.get_episode_details(details["id"], details["season_number"],
                details["episode_number"])

                return {"media_type": "episode",
                "title": data["title"], "episode_num": data["episode_num"], 
                "season_num": data["season_num"], "duration_seconds": data["duration"],
                "poster_path": data["poster_path"]}

            else:
                return None

    async def get_movies(self, task: Task):
        """
        adds an array of all movies found to db
        """
        movies = []

        for path in self.movie_dirs:
            if os.path.isdir(path):
                total_files = len([name for name in os.listdir(path) if ".mkv" in name])
                count = 0
                for f in os.listdir(path):
                    if ".mkv" in f:
                        file = str(os.path.join(path, f))
                        data = await self.tmdb.get_movie_details(int(f[:-4]))
                        data["id"] = f[:-4]
                        data["file_path"] = file
                        data["duration_seconds"] = self.get_duration(file)

                        count+=1
                        await task.update((count/total_files)*100, f"Found {data["title"]}")

                        print(f"{round((count/total_files)*100)} %, Found {data["title"]}")

                        movies.append(data)

        await self.db.add_movies_bulk(movies)

    async def get_series(self, task: Task):
        """
        adds all series to db
        """
        series = []

        for path in self.series_dirs:
            if os.path.isdir(path):

                total_series = len([name for name in os.listdir(path) if os.path.isdir(os.path.join(path, name))])
                count = 0

                for subpath in os.listdir(path):
                    if os.path.isdir(os.path.join(path, subpath)):
                        current_series = await self.tmdb.get_series_details(int(subpath))
                        current_series["seasons"] = await self.get_seasons(str(os.path.join(path, subpath)), subpath)

                        count+=1

                        await task.update((count/total_series)*100, f"Found {current_series["title"]}")
                        print(f"{round((count/total_series)*100)} %, Found {current_series["title"]}")

                        series.append(current_series)
        
        await self.db.add_series_bulk(series)

    async def get_seasons(self, series_path: str, series_id: int):
        """
        returns array of seasons dicts
        """
        seasons = []
        for subpath in os.listdir(series_path):
            season, episodes = await self.tmdb.get_season_details(series_id, int(subpath))
            season["season_number"] = int(subpath)
            season["series_id"] = series_id
            season["episodes"] = []

            for ep in os.listdir(os.path.join(series_path, subpath)):
                if os.path.isfile(os.path.join(series_path, subpath, ep)):
                    episode = next((e for e in episodes if e["episode_num"] == int(ep[:-4])), None)

                    if episode:
                        episode["file_path"] = str(os.path.join(series_path, subpath, ep))
                        episode["duration_seconds"] = self.get_duration(str(os.path.join(series_path, subpath, ep)))
                        season["episodes"].append(episode)

            seasons.append(season)
        return seasons


    def get_duration(self, filepath: str):
        result = subprocess.run(
            [
                "ffprobe",
                "-v", "error",
                "-show_entries", "format=duration",
                "-of", "json",
                filepath
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        data = json.loads(result.stdout)
        duration = float(data["format"]["duration"])
        return int(duration)