from app.schemas.base_plugin import BasePlugin
from app.plugins.weather.controller.controller import WeatherController
from app.plugins.weather.routes import WeatherRouter

class WeatherPlugin(BasePlugin):
    async def setup(self, core):
        self.controller = WeatherController(core)
        await self.controller.setup()
        self.router = WeatherRouter(self.controller)

    def get_router(self):
        return self.router.router

    def get_ws_events(self):
        return ["weather.updated"]

    def get_name(self):
        return "weather"