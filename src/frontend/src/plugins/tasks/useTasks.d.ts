export interface Label {
    id: string;
    name: string;
    colour: string;
}
export interface TaskList {
    id: string;
    name: string;
    colour: string;
}
export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    toDoDate?: string;
    completed: boolean;
    labels?: Label[];
    task_list?: TaskList;
}
export interface TaskState {
    overdue_tasks: Task[];
    today_tasks: Task[];
    tasks_due_today: Task[];
}
export declare function useTaskState(): {
    taskState: TaskState | null;
};
