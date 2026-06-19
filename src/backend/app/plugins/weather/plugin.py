from app.schemas.base_plugin import BasePlugin
from app.plugins.weather.controller.controller import WeatherController
from app.plugins.weather.routes import WeatherRouter
from app.plugins.weather.command import WeatherCommand

class WeatherPlugin(BasePlugin):
    async def setup(self, core):
        self.controller = WeatherController(core)
        await self.controller.setup()
        self.router = WeatherRouter(self.controller)
        self.command = WeatherCommand(self.controller)

    def get_router(self):
        return self.router.router

    def get_ws_events(self):
        return ["weather.updated"]

    def get_name(self):
        return "weather"

    def get_command(self):
        return self.command

    async def load_state(self):
        # load state
        await self.controller.update_state()

    async def save_state(self):
        # save state (does nothing as weather state is not persisted)
        pass