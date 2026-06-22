"""
handles all interaction with the database for the tasks plugin
"""

from app.core.core import Core
from app.plugins.tasks.schemas import Task, TaskList, Label, TasksState

class TasksDBController:
    def __init__(self, core: Core):
        self.core = core

    async def create_tables(self):
        await self.core.db_manager.execute_many(
            """
            CREATE TABLE IF NOT EXISTS tasks_labels (
                id TEXT PRIMARY KEY,
                name TEXT,
                colour TEXT
            );

            CREATE TABLE IF NOT EXISTS tasks_list (
                id TEXT PRIMARY KEY,
                name TEXT,
                colour TEXT
            );

            CREATE TABLE IF NOT EXISTS tasks_tasks (
                id TEXT PRIMARY KEY,
                title TEXT,
                description TEXT,
                due_date TEXT,
                to_do_date TEXT,
                completed BOOLEAN,
                list_id TEXT
            );

            CREATE TABLE IF NOT EXISTS tasks_tasks_labels (
                task_id TEXT,
                label_id TEXT,
                PRIMARY KEY (task_id, label_id)
            );

            CREATE TABLE IF NOT EXISTS tasks_tasks_lists (
                task_id TEXT,
                list_id TEXT,
                PRIMARY KEY (task_id, list_id)
            );
            """
        )


    async def add_task(self, task: Task):
        # add a task to the database
        await self.core.db_manager.execute(
            """
            INSERT INTO tasks_tasks (id, title, description, due_date, to_do_date, completed, list_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (task.id, task.title, task.description, task.due_date, task.to_do_date, task.completed, task.list.id if task.list else None)
        )

        # link the task to its labels
        for label in task.labels:
            await self.core.db_manager.execute(
                """
                INSERT INTO tasks_tasks_labels (task_id, label_id)
                VALUES (?, ?)
                """,
                (task.id, label.id)
            )

    async def get_task(self, task_id: str) -> Task:
        # get a task from the database
        task_row = await self.core.db_manager.fetch_one(
            """
            SELECT * FROM tasks_tasks WHERE id = ?
            """,
            (task_id,)
        )

        if not task_row:
            return None

        # get the labels for the task
        label_rows = await self.core.db_manager.fetch_all(
            """
            SELECT l.* FROM tasks_labels l
            JOIN tasks_tasks_labels tl ON l.id = tl.label_id
            WHERE tl.task_id = ?
            """,
            (task_id,)
        )

        labels = [Label(id=row["id"], name=row["name"], colour=row["colour"]) for row in label_rows]

        # get the list for the task
        list_row = await self.core.db_manager.fetch_one(
            """
            SELECT l.* FROM tasks_list l
            JOIN tasks_tasks_lists tl ON l.id = tl.list_id
            WHERE tl.task_id = ?
            """,
            (task_id,)
        )

        task_list = TaskList(id=list_row["id"], name=list_row["name"], colour=list_row["colour"]) if list_row else None

        return Task(
            id=task_row["id"],
            title=task_row["title"],
            description=task_row["description"],
            due_date=task_row["due_date"],
            to_do_date=task_row["to_do_date"],
            completed=task_row["completed"],
            labels=labels,
            list=task_list
        )
        
    async def update_task(self, task: Task):
        # update a task in the database
        await self.core.db_manager.execute(
            """
            UPDATE tasks_tasks
            SET title = ?, description = ?, due_date = ?, to_do_date = ?, completed = ?, list_id = ?
            WHERE id = ?
            """,
            (task.title, task.description, task.due_date, task.to_do_date, task.completed, task.list.id if task.list else None, task.id)
        )

        # remove existing labels for the task
        await self.core.db_manager.execute(
            """
            DELETE FROM tasks_tasks_labels WHERE task_id = ?
            """,
            (task.id,)
        )

        # link the task to its new labels
        for label in task.labels:
            await self.core.db_manager.execute(
                """
                INSERT INTO tasks_tasks_labels (task_id, label_id)
                VALUES (?, ?)
                """,
                (task.id, label.id)
            )

    async def delete_task(self, task_id: str):
        # delete a task from the database
        await self.core.db_manager.execute(
            """
            DELETE FROM tasks_tasks WHERE id = ?
            """,
            (task_id,)
        )

        # remove existing labels for the task
        await self.core.db_manager.execute(
            """
            DELETE FROM tasks_tasks_labels WHERE task_id = ?
            """,
            (task_id,)
        )

        # remove existing list for the task
        await self.core.db_manager.execute(
            """
            DELETE FROM tasks_tasks_lists WHERE task_id = ?
            """,
            (task_id,)
        )

    async def get_all_tasks(self) -> list[Task]:
        # get all tasks from the database
        task_rows = await self.core.db_manager.fetch_all(
            """
            SELECT * FROM tasks_tasks
            """
        )

        tasks = []
        for task_row in task_rows:
            task_id = task_row["id"]

            # get the labels for the task
            label_rows = await self.core.db_manager.fetch_all(
                """
                SELECT l.* FROM tasks_labels l
                JOIN tasks_tasks_labels tl ON l.id = tl.label_id
                WHERE tl.task_id = ?
                """,
                (task_id,)
            )

            labels = [Label(id=row["id"], name=row["name"], colour=row["colour"]) for row in label_rows]

            # get the list for the task
            list_row = await self.core.db_manager.fetch_one(
                """
                SELECT l.* FROM tasks_list l
                JOIN tasks_tasks_lists tl ON l.id = tl.list_id
                WHERE tl.task_id = ?
                """,
                (task_id,)
            )

            task_list = TaskList(id=list_row["id"], name=list_row["name"], colour=list_row["colour"]) if list_row else None

            tasks.append(Task(
                id=task_row["id"],
                title=task_row["title"],
                description=task_row["description"],
                due_date=task_row["due_date"],
                to_do_date=task_row["to_do_date"],
                completed=task_row["completed"],
                labels=labels,
                list=task_list
            ))

        return tasks

    async def add_task_list(self, task_list: TaskList):
        # add a task list to the database
        await self.core.db_manager.execute(
            """
            INSERT INTO tasks_list (id, name, colour)
            VALUES (?, ?, ?)
            """,
            (task_list.id, task_list.name, task_list.colour)
        )

    async def get_task_list(self, list_id: str) -> TaskList:
        # get a task list from the database
        list_row = await self.core.db_manager.fetch_one(
            """
            SELECT * FROM tasks_list WHERE id = ?
            """,
            (list_id,)
        )

        if not list_row:
            return None

        # get the tasks for the list
        task_rows = await self.core.db_manager.fetch_all(
            """
            SELECT t.* FROM tasks_tasks t
            JOIN tasks_tasks_lists tl ON t.id = tl.task_id
            WHERE tl.list_id = ?
            """,
            (list_id,)
        )

        tasks = []
        for task_row in task_rows:
            task_id = task_row["id"]

            # get the labels for the task
            label_rows = await self.core.db_manager.fetch_all(
                """
                SELECT l.* FROM tasks_labels l
                JOIN tasks_tasks_labels tl ON l.id = tl.label_id
                WHERE tl.task_id = ?
                """,
                (task_id,)
            )

            labels = [Label(id=row["id"], name=row["name"], colour=row["colour"]) for row in label_rows]

            tasks.append(Task(
                id=task_row["id"],
                title=task_row["title"],
                description=task_row["description"],
                due_date=task_row["due_date"],
                to_do_date=task_row["to_do_date"],
                completed=task_row["completed"],
                labels=labels,
                list=None
            ))

        return TaskList(
            id=list_row["id"],
            name=list_row["name"],
            colour=list_row["colour"],
            tasks=tasks
        )

    async def get_today_due_tasks(self) -> list[Task]:
        # get all tasks that are due today
        task_rows = await self.core.db_manager.fetch_all(
            """
            SELECT * FROM tasks_tasks WHERE due_date = date('now')
            """
        )

        tasks = []
        for task_row in task_rows:
            task_id = task_row["id"]

            # get the labels for the task
            label_rows = await self.core.db_manager.fetch_all(
                """
                SELECT l.* FROM tasks_labels l
                JOIN tasks_tasks_labels tl ON l.id = tl.label_id
                WHERE tl.task_id = ?
                """,
                (task_id,)
            )

            labels = [Label(id=row["id"], name=row["name"], colour=row["colour"]) for row in label_rows]

            # get the list for the task
            list_row = await self.core.db_manager.fetch_one(
                """
                SELECT l.* FROM tasks_list l
                JOIN tasks_tasks_lists tl ON l.id = tl.list_id
                WHERE tl.task_id = ?
                """,
                (task_id,)
            )

            task_list = TaskList(id=list_row["id"], name=list_row["name"], colour=list_row["colour"]) if list_row else None

            tasks.append(Task(
                id=task_row["id"],
                title=task_row["title"],
                description=task_row["description"],
                due_date=task_row["due_date"],
                to_do_date=task_row["to_do_date"],
                completed=task_row["completed"],
                labels=labels,
                list=task_list
            ))

        return tasks

    async def get_overdue_tasks(self) -> list[Task]:
        # get all tasks that are overdue
        task_rows = await self.core.db_manager.fetch_all(
            """
            SELECT * FROM tasks_tasks WHERE due_date < date('now') AND completed = 0
            """
        )

        tasks = []
        for task_row in task_rows:
            task_id = task_row["id"]

            # get the labels for the task
            label_rows = await self.core.db_manager.fetch_all(
                """
                SELECT l.* FROM tasks_labels l
                JOIN tasks_tasks_labels tl ON l.id = tl.label_id
                WHERE tl.task_id = ?
                """,
                (task_id,)
            )

            labels = [Label(id=row["id"], name=row["name"], colour=row["colour"]) for row in label_rows]

            # get the list for the task
            list_row = await self.core.db_manager.fetch_one(
                """
                SELECT l.* FROM tasks_list l
                JOIN tasks_tasks_lists tl ON l.id = tl.list_id
                WHERE tl.task_id = ?
                """,
                (task_id,)
            )

            task_list = TaskList(id=list_row["id"], name=list_row["name"], colour=list_row["colour"]) if list_row else None

            tasks.append(Task(
                id=task_row["id"],
                title=task_row["title"],
                description=task_row["description"],
                due_date=task_row["due_date"],
                to_do_date=task_row["to_do_date"],
                completed=task_row["completed"],
                labels=labels,
                list=task_list
            ))

        return tasks

    async def get_todays_tasks(self) -> list[Task]:
        # get all tasks that are due today
        task_rows = await self.core.db_manager.fetch_all(
            """
            SELECT * FROM tasks_tasks WHERE to_do_date = date('now')
            """
        )

        tasks = []
        for task_row in task_rows:
            task_id = task_row["id"]

            # get the labels for the task
            label_rows = await self.core.db_manager.fetch_all(
                """
                SELECT l.* FROM tasks_labels l
                JOIN tasks_tasks_labels tl ON l.id = tl.label_id
                WHERE tl.task_id = ?
                """,
                (task_id,)
            )

            labels = [Label(id=row["id"], name=row["name"], colour=row["colour"]) for row in label_rows]

            # get the list for the task
            list_row = await self.core.db_manager.fetch_one(
                """
                SELECT l.* FROM tasks_list l
                JOIN tasks_tasks_lists tl ON l.id = tl.list_id
                WHERE tl.task_id = ?
                """,
                (task_id,)
            )

            task_list = TaskList(id=list_row["id"], name=list_row["name"], colour=list_row["colour"]) if list_row else None

            tasks.append(Task(
                id=task_row["id"],
                title=task_row["title"],
                description=task_row["description"],
                due_date=task_row["due_date"],
                to_do_date=task_row["to_do_date"],
                completed=task_row["completed"],
                labels=labels,
                list=task_list
            ))

        return tasks