"""
handles all database connections with mpv
"""

from app.db.manager import DBManager

class MPVDb:
    def __init__(self, db_manager: DBManager):
        self.db = db_manager

    async def initialise_db(self):
        """
        creates all tables for mpv
        """
        await self.db.execute(
            """
            CREATE TABLE IF NOT EXISTS movies(
            id INTEGER PRIMARY KEY,
            title TEXT,
            poster_path TEXT,
            backdrop_path TEXT,
            logo_path TEXT,
            description TEXT,
            release_date DATETIME,
            file_path TEXT NOT NULL,
            duration_seconds INTEGER NOT NULL,
            progress_seconds INTEGER DEFAULT 0,
            completed INTEGER DEFAULT 0
            )
            """)

        await self.db.execute(
            """
            CREATE TABLE IF NOT EXISTS series(
            id INTEGER PRIMARY KEY,
            title TEXT,
            poster_path TEXT
            )
            """
        )

        await self.db.execute(
            """
            CREATE TABLE IF NOT EXISTS seasons(
            id INTEGER PRIMARY KEY,
            season_number INTEGER NOT NULL,
            series_id INTEGER NOT NULL,
            title TEXT,
            air_date DATETIME,
            poster_path TEXT,
            FOREIGN KEY (series_id) REFERENCES series(id) ON DELETE CASCADE
            )
            """
        )

        await self.db.execute(
            """
            CREATE TABLE IF NOT EXISTS episodes(
            id INTEGER PRIMARY KEY,,
            episode_number INTEGER NOT NULL,
            season_id INTEGER NOT NULL,
            title TEXT,
            description TEXT,
            still_path TEXT,
            file_path TEXT,
            duration_seconds INTEGER,
            progress_seconds INTEGER NOT NULL DEFAULT 0,
            last_watched DATETIME,
            completed INTEGER DEFAULT 0,
            FOREIGN KEY (season_id) REFERENCES seasons(id) ON DELETE CASCADE
            )
            """
        )

    async def get_movies(self):
        """
        fetches all movies with simple details
        """
        movies = await self.db.fetch_all(
            """
            SELECT id, title, poster_path, release_date, 
            duration_seconds, progress_seconds, completed
            FROM movies
            """
        )

        return movies

    async def get_movie(self, id: int):
        """
        fetches all the details about a movie with id
        """
        movie = await self.db.fetch_one(
            """
            SELECT *
            FROM movies
            WHERE id = ?
            """
        , [id,])
    
    async def add_movie(self, movie: dict):
        """
        adds dict containing movie details to db
        """
        await self.db.execute(
            """
            INSERT OR IGNORE INTO movies (id, title, poster_path, backdrop_path, 
            logo_path, description, release_date, file_path, duration_seconds)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
            """
        , [ movie["id"], movie["title"], movie["poster_path"], movie["backdrop_path"],
        movie["logo_path"], movie["description"], movie["release_date"], movie["file_path"],
        movie["duration_seconds"] ])

    async def add_movies_bulk(self, movies: [dict]):
        """
        adds movies in bulk
        takes in an array of movie dicts
        """
        async for movie in movies:
            await self.add_movie(movie)

    async def update_movie_progress(self, id: int, progress: int, completed: bool = None):
        """
        updates a movie with id with progress and (optionally) completed
        """
        if completed != None:
            self.db.execute(
                """
                UPDATE movies
                SET progress_seconds = ?, completed = ?
                WHERE id = ?
                """
            , [progress, int(completed), id])
        else:
            self.db.execute(
                """
                UPDATE movies
                SET progress_seconds = ?
                WHERE id = ?
                """
            , [progress, id])

    async def delete_movie(self, id: int):
        """
        deletes movie with id
        """
        self.db.execute(
            """
            DELETE FROM movies 
            WHERE id = ? 
            """
        , [id,])

    async def delete_movies_bulk(self, ids: [int]):
        """
        deletes all movies in list of id's
        """
        async for id in ids:
            await self.delete_movie(id)