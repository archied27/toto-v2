import { apiFetch } from "@/hooks/api";
import { useWebSocketContext } from "@/hooks/WebSocketContext";
import { useCallback, useEffect, useState } from "react";

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

export function useTaskState() {
    const [taskState, setTaskState] = useState<TaskState | null>(null);
    const { useEvent } = useWebSocketContext();

    useEffect(() => {
        apiFetch<TaskState>("/tasks/state")
            .then(data => {
                setTaskState(data);
            })
            .catch(() => {
                console.error("Failed to fetch task state");
            });
    }, []);

    const handleUpdate = useCallback((data: unknown) => {
        setTaskState(data as TaskState);
    }, []);

    useEvent("tasks.state_updated", handleUpdate);

    return { taskState };
}