"""
manages access to database
"""

import aiosqlite

class DBManager:
    def __init__(self, db_path):
        self.path = db_path

    async def execute(self, query: str, params: list = None):
        """
        executes INSERT/UPDATE/DELETE
        """
        async with aiosqlite.connect(self.path) as db:
            cursor = await db.execute(sql=query, parameters=params)
            await db.commit()
            return cursor.lastrowid

    async def fetch_one(self, query: str, params: list = None):
        """
        fetches single row from SELECT query
        """
        async with aiosqlite.connect(self.path) as db:
            db.row_factory = aiosqlite.Row
            async with db.execute(sql=query, parameters=params) as cursor:
                return await cursor.fetch_one()

    async def fetch_all(self, query: str, params: list = None):
        """
        fetches everything from a SELECT query
        """
        async with aiosqlite.connect(self.path) as db:
            db.row_factory = aiosqlite.Row
            async with db.execute(sql=query, parameters=params) as cursor:
                return await cursor.fetch_all()
    
