"""
manages access to database
"""

import aiosqlite

class DBManager:
    def __init__(self, db_path):
        self.path = db_path

    async def execute(self, query: str, params: list):
        """
        executes INSERT/UPDATE/DELETE
        """
        async with aiosqlite.connect(self.path) as db:
            await db.execute(sql=query, parameters=params)
            await db.commit()

    async def fetch_one(self, query: str, params: list):
        """
        fetches single row from SELECT query
        """
        async with aiosqlite.connect(self.path) as db:
            async with db.execute(sql=query, parameters=params) as cursor:
                return cursor.fetch_one()

    async def fetch_all(self, query: str, params: list):
        """
        fetches everything from a SELECT query
        """
        data = []

        async with aiosqlite.connect(self.path) as db:
            async with db.execute(sql=query, parameters=params) as cursor:
                async for row in cursor:
                    data.append(row.fetch_all)
    
    