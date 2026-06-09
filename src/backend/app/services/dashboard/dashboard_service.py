from app.core.core import Core
from app.services.dashboard.dashboard_state import DashboardState
from datetime import datetime, UTC

class DashboardService:
    def __init__(self, core: Core):
        self.core = core
        self.dashboard_state = DashboardState()
        self.core.bus.on("dashboard.rerank", self.rerank)

    async def rerank(self) -> None:
        change = False

        for plugin_id, data in self.core.state.get_all():
            priority = data["dashboard_priority"]

            if priority >= self.dashboard_state.hero.priority:
                self.dashboard_state.hero.id = plugin_id
                self.dashboard_state.hero.priority = priority
                change = True

            elif priority >= self.dashboard_state.long.priority:
                self.dashboard_state.long.id = plugin_id
                self.dashboard_state.long.priority = priority
                change = True

            elif priority >= self.dashboard_state.small_a.priority:
                self.dashboard_state.small_a.id = plugin_id
                self.dashboard_state.small_a.priority = priority
                change = True

            elif priority >= self.dashboard_state.small_b.priority:
                self.dashboard_state.small_b.id = plugin_id
                self.dashboard_state.small_b.priority = priority
                change = True

        await self.core.bus.emit("dashboard.changed")
        
        self.dashboard_state.last_ranked = datetime.now(UTC)

            

        
