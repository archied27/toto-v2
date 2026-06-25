import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import { useTaskState, type Task } from "./useTasks";
import TaskTabs from "./components/TaskTabs";

export default function TasksPage() {
    const { taskState } = useTaskState();
    const [currentTab, setCurrentTab] = useState<"Today" | "Tomorrow" | "Upcoming" | "All">("Today");

    const [currentTasks, setCurrentTasks] = useState<Task[]>(taskState?.today_tasks || []);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

    useEffect(() => {
        setCompletedTasks(currentTasks.filter(task => task.completed));
    }, [currentTasks]);

    const handleTabChange = (tab: "Today" | "Tomorrow" | "Upcoming" | "All") => {
        setCurrentTab(tab);
        switch (tab) {
            case "Today":
                setCurrentTasks(taskState?.today_tasks || []);
                break;
            case "Tomorrow":
                setCurrentTasks(taskState?.tasks_due_today || []);
                break;
            case "Upcoming":
                setCurrentTasks(taskState?.overdue_tasks || []);
                break;
            case "All":
                setCurrentTasks([
                    ...(taskState?.today_tasks || []),
                    ...(taskState?.tasks_due_today || []),
                    ...(taskState?.overdue_tasks || [])
                ]);
                break;
        }
    }

    return (
        <div className="bg-background text-foreground px-3 flex flex-col gap-5 pb-35">
            <Hero selected={currentTab} total={currentTasks.length} completed={completedTasks.length} />
            <TaskTabs currentTab={currentTab} onTabChange={handleTabChange} />

        </div>
    )
}
