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

    async def execute_many(self, query: str, params_list: list = None):
        """
        executes INSERT/UPDATE/DELETE for multiple rows
        """
        async with aiosqlite.connect(self.path) as db:
            if params_list is None:
                params_list = []
            await db.executescript(sql_script=query)
            await db.commit()

    async def fetch_one(self, query: str, params: list = None):
        """
        fetches single row from SELECT query
        """
        async with aiosqlite.connect(self.path) as db:
            db.row_factory = aiosqlite.Row
            async with db.execute(sql=query, parameters=params) as cursor:
                return await cursor.fetchone()

    async def fetch_all(self, query: str, params: list = None):
        """
        fetches everything from a SELECT query
        """
        async with aiosqlite.connect(self.path) as db:
            db.row_factory = aiosqlite.Row
            async with db.execute(sql=query, parameters=params) as cursor:
                return await cursor.fetchall()
    
