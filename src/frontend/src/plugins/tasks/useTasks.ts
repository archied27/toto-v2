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

export function useGetTaskLists() {
    const [taskLists, setTaskLists] = useState<TaskList[]>([]);

    const fetchLists = useCallback(() => {
        apiFetch<TaskList[]>("/tasks/get_lists")
            .then(data => setTaskLists(data))
            .catch(() => console.error("Failed to fetch task lists"));
    }, []);

    useEffect(() => { fetchLists(); }, [fetchLists]);

    return { taskLists, refetch: fetchLists };
}

export function useGetTaskLabels() {
    const [taskLabels, setTaskLabels] = useState<Label[]>([]);

    const fetchLabels = useCallback(() => {
        apiFetch<Label[]>("/tasks/get_labels")
            .then(data => setTaskLabels(data))
            .catch(() => console.error("Failed to fetch task labels"));
    }, []);

    useEffect(() => { fetchLabels(); }, [fetchLabels]);

    return { taskLabels, refetch: fetchLabels };
}

export function useAddList() {
    const [loading, setLoading] = useState(false);

    const addList = useCallback(async (name: string, colour: string) => {
        setLoading(true);
        try {
            await apiFetch("/tasks/add_list", {
                method: "POST",
                body: JSON.stringify({ name, colour }),
            });
        } catch (error) {
            console.error("Failed to add task list", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { addList, loading };
}

export function useAddLabel() {
    const [loading, setLoading] = useState(false);

    const addLabel = useCallback(async (name: string, colour: string) => {
        setLoading(true);
        try {
            await apiFetch("/tasks/add_label", {
                method: "POST",
                body: JSON.stringify({ name, colour }),
            });
        } catch (error) {
            console.error("Failed to add task label", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { addLabel, loading };
}