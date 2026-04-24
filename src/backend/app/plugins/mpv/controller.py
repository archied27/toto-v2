"""
handles logic for mpv plugin
"""

from app.plugins.mpv.db import MPVDb
from app.core.core import Core

class MPVController:
    def __init__(self, core: Core):
        self.core = core
        self.db = MPVDb(self.core.db_manager)

    def update_db(self):
        """
        syncs the database with files on computer
        background task
        """
        return