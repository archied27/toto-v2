"""
handles logic for mpv plugin
"""

from app.plugins.mpv.controller.db import MPVDb
from app.plugins.mpv.controller.mpv_socket_controller import MPVSocket
from app.core.core import Core
import subprocess

class MPVController:
    def __init__(self, core: Core):
        self.core = core
        self.db = MPVDb(self.core.db_manager)
        self.socket_manager = MPVSocket("/tmp/mpvsocket")

    def update_db(self):
        """
        syncs the database with files on computer
        background task
        """
        return

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
                "duration_seconds": data["duration_seconds"], "progress_seconds": data["progress_seconds"],
                "poster_path": data["poster_path"]}
            elif details["type"] == "episode":
                # todo
                return None
            else:
                return None