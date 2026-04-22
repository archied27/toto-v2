from app.schemas.base_plugin import BasePlugin
from app.plugins.mpv.routes import MPVRouter
from app.plugins.mpv.controller import MPVController

class MPVPlugin(BasePlugin):
    def setup(self, core):
        self.controller = MPVController(core)
        self.router = MPVRouter(self.controller)

    def get_router(self):
        return self.router.router

    def get_ws_events(self):
        return []