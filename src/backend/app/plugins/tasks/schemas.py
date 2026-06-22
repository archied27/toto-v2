from dataclasses import dataclass, field
from typing import Optional

@dataclass
class Task:
    id: str
    title: str
    description: Optional[str] = None
    due_date: Optional[str] = None # iso8601 format
    to_do_date: Optional[str] = None # iso8601 format, the date the task should be done
    completed: bool = False
    labels: list[Label] = field(default_factory=list)
    list: Optional[TaskList] = None

@dataclass
class TaskList:
    id: str
    name: str
    colour: str
    tasks: list[Task] = field(default_factory=list)

@dataclass
class Label:
    id: str
    name: str
    colour: str

@dataclass
class TasksState:
    dashboard_priority: int = 0
    page_priority: int = 50
    base_priority: int = 50
    overdue_tasks: list[Task] = field(default_factory=list) # all tasks that are overdue
    today_tasks: list[Task] = field(default_factory=list) # all tasks for today
    tasks_due_today: list[Task] = field(default_factory=list) # all tasks that are due today