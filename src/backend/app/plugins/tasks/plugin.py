from app.schemas.base_plugin import BasePlugin
from app.plugins.tasks.routes import TasksRouter
from app.plugins.tasks.controller.controller import TasksController
from app.plugins.tasks.command import TasksCommand

class TasksPlugin(BasePlugin):
    async def setup(self, core):
        self.controller = TasksController(core)
        self.router = TasksRouter(self.controller)
        self.command = TasksCommand(self.controller)

        await self.controller.setup()

    def get_router(self):
        return self.router.router

    def get_ws_events(self):
        return ["tasks.state_updated"]

    def get_command(self):
        return self.command

    async def load_state(self):
        # load the state from the database
        await self.controller.update_state()

    async def save_state(self):
        pass

    def get_name(self):
        return "tasks"