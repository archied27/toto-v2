from app.schemas.base_plugin import BasePlugin

class TasksPlugin(BasePlugin):
    async def setup(self, core):
        self.controller = TasksController(core)
        self.router = TasksRouter(self.controller)
        await core.state.set("tasks", {"dashboard_priority": 50})

    def get_router(self):
        return self.router.router

    def get_ws_events(self):
        return []

    def get_name(self):
        return "tasks"