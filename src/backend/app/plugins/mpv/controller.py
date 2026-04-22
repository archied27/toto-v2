"""
handles logic for mpv plugin
"""

from app.plugins.mpv.db import MPVDb

class MPVController:
    def __init__(self, core):
        self.core = core
        self.db = MPVDb(self.core.db_manager)

    