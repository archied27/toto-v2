from dataclasses import dataclass, field
from datetime import datetime, UTC

@dataclass
class DashboardSlot:
    id: str | None = None
    priority: int = 0

@dataclass
class DashboardState:
    hero: DashboardSlot = field(default_factory=DashboardSlot)
    long: DashboardSlot = field(default_factory=DashboardSlot)
    small_a: DashboardSlot = field(default_factory=DashboardSlot)
    small_b: DashboardSlot = field(default_factory=DashboardSlot)

    last_ranked: datetime | None = None

    @property
    def slots(self):
        return self.hero, self.long, self.small_a, self.small_b