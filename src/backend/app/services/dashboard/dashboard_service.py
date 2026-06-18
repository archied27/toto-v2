from app.core.core import Core
from app.services.dashboard.dashboard_state import DashboardState
from datetime import datetime, UTC

class DashboardService:
    def __init__(self, core: Core):
        self.core = core
        self.dashboard_state = DashboardState()
        self.core.bus.on("dashboard.rerank", self.rerank)
        self.core.scheduler.add_recurring("dashboard.rerank", minute="*/1") # rerank every minute 

    async def rerank(self) -> None:
        new_state = DashboardState()

        active_plugins = [
            (plugin_id, data["dashboard_priority"])
            for plugin_id, data in self.core.state.get_all()
            if data.get("dashboard_priority", 0) != 0
        ]
        
        active_plugins.sort(key=lambda x:x[1], reverse=True)

        for slot, (plugin_id, priority) in zip(new_state.slots, active_plugins):
            slot.id = plugin_id
            slot.priority = priority

        new_state.last_ranked = datetime.now(UTC)
        await self.handle_rerank(new_state)

        
    async def handle_rerank(self, new_state: DashboardState) -> None:
        # slots have changed
        if new_state.slots != self.dashboard_state.slots:
            self.dashboard_state = new_state
            await self.core.bus.emit("dashboard.changed", new_state.slots)
            
        