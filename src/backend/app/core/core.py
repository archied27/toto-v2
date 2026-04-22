"""
core class
"""

from app.core.event_bus import EventBus
from app.core.background_worker import BackgroundWorker
from app.core.scheduler import Scheduler
from app.db.manager import DBManager

class Core:
    def __init__(self, event_bus: EventBus, bg_worker: BackgroundWorker, 
                scheduler: Scheduler, db_manager: DBManager):
        self.bus = event_bus
        self.bg_worker = bg_worker
        self.scheduler = scheduler
        self.db_manager = db_manager 