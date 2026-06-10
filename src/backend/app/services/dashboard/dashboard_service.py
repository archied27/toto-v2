from app.core.core import Core
from app.services.dashboard.dashboard_state import DashboardState
from datetime import datetime, UTC

class DashboardService:
    def __init__(self, core: Core):
        self.core = core
        self.dashboard_state = DashboardState()
        self.core.bus.on("dashboard.rerank", self.rerank)

    async def rerank(self) -> None:
        new_state = DashboardState()

        for plugin_id, data in self.core.state.get_all():
            priority = data["dashboard_priority"]

            if priority != 0:
                if priority >= new_state.hero.priority:
                    new_state.hero.id = plugin_id
                    new_state.hero.priority = priority

                elif priority >= new_state.long.priority:
                    new_state.long.id = plugin_id
                    new_state.long.priority = priority

                elif priority >= new_state.small_a.priority:
                    new_state.small_a.id = plugin_id
                    new_state.small_a.priority = priority

                elif priority >= new_state.small_b.priority:
                    new_state.small_b.id = plugin_id
                    new_state.small_b.priority = priority
        
        new_state.last_ranked = datetime.now(UTC)

        await self.handle_rerank(new_state)

        
    async def handle_rerank(self, new_state: DashboardState) -> None:
        # slots have changed
        if new_state.slots != self.dashboard_state.slots:
            self.dashboard_state = new_state
            await self.core.bus.emit("dashboard.changed", new_state.slots)
            
        