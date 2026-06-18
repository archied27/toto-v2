from dataclasses import dataclass

@dataclass
class TasksState:
    dashboard_priority: int = 0
    page_priority: int = 50
    base_priority: int = 50