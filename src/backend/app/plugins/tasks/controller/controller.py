"""
contains logic for tasks plugin
"""

from app.plugins.tasks.controller.db_controller import TasksDBController
from app.core.core import Core
from app.plugins.tasks.schemas import Task, TaskList, Label, TasksState

class TasksController:
    def __init__(self, core: Core):
        self.core = core
        self.db_controller = TasksDBController(core)

    async def setup(self):
        # create the tables if they don't exist
        await self.db_controller.create_tables()

    async def update_state(self):
        # get all tasks that are overdue
        overdue_tasks = await self.db_controller.get_overdue_tasks()
        # get all tasks that are due today
        tasks_due_today = await self.db_controller.get_today_due_tasks()
        # get all tasks that are for today
        todays_tasks = await self.db_controller.get_todays_tasks()

        # update the state with the new tasks
        await self.core.state.set("tasks", TasksState(
            dashboard_priority=await self.get_current_priority(),
            page_priority=await self.get_current_priority(),
            base_priority=50,
            overdue_tasks=overdue_tasks,
            today_tasks=todays_tasks,
            tasks_due_today=tasks_due_today
        ))

    async def update_priority(self):
        # update the priority of the tasks plugin based on the number of overdue tasks and tasks due today
        priority = await self.get_current_priority()
        await self.core.state.set("tasks", {"dashboard_priority": priority, "page_priority": priority})

    async def get_current_priority(self) -> int:
        overdue_tasks = await self.db_controller.get_overdue_tasks()
        tasks_due_today = await self.db_controller.get_today_due_tasks()
        tasks_set_today = await self.db_controller.get_todays_tasks()
        priority = 0
        priority += len(overdue_tasks) * 3
        priority += len(tasks_due_today) * 2
        priority += len(tasks_set_today) * 1
        return min(priority, 100)

    async def add_task(self, task: Task):
        # add a task to the database
        await self.db_controller.add_task(task)

    async def get_task(self, task_id: str) -> Task:
        # get a task from the database
        return await self.db_controller.get_task(task_id)

    async def update_task(self, task: Task):
        # update a task in the database
        await self.db_controller.update_task(task)

    async def delete_task(self, task_id: str):
        # delete a task from the database
        await self.db_controller.delete_task(task_id)   
    
    async def get_all_tasks(self) -> list[Task]:
        # get all tasks from the database
        return await self.db_controller.get_all_tasks()

    async def add_task_list(self, task_list: TaskList):
        # add a task list to the database
        await self.db_controller.add_task_list(task_list)

    async def get_task_list(self, list_id: str) -> TaskList:
        # get a task list from the database
        return await self.db_controller.get_task_list(list_id)

    async def get_today_due_tasks(self) -> list[Task]:
        # get all tasks that are due today
        return await self.db_controller.get_today_due_tasks()

    async def get_overdue_tasks(self) -> list[Task]:
        # get all tasks that are overdue
        return await self.db_controller.get_overdue_tasks()

    async def get_todays_tasks(self) -> list[Task]:
        # get all tasks that are for today
        return await self.db_controller.get_todays_tasks()