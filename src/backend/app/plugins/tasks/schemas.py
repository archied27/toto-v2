from pydantic import BaseModel, Field
from typing import Optional

class Label(BaseModel):
    name: str
    colour: str

class TaskList(BaseModel):
    name: str
    colour: str

class Task(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[str] = None
    to_do_date: Optional[str] = None
    completed: bool = False
    labels: list[Label] = Field(default_factory=list)
    task_list: Optional[TaskList] = None

TaskList.model_rebuild()

class TasksState(BaseModel):
    dashboard_priority: int = 0
    page_priority: int = 50
    base_priority: int = 50
    overdue_tasks: list[Task] = Field(default_factory=list)
    today_tasks: list[Task] = Field(default_factory=list)
    tasks_due_today: list[Task] = Field(default_factory=list)