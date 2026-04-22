from app.schemas.base_plugin import BasePlugin
from app.plugins.mpv.routes import router

class MPVPlugin(BasePlugin):
    def setup(core):
        return

    def get_router(self):
        return router

    def get_ws_events(self):
        return []