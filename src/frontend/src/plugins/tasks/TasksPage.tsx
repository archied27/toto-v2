import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import { useTaskState, type Task } from "./useTasks";
import TaskTabs from "./components/TaskTabs";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

export default function TasksPage() {
    const { taskState } = useTaskState();
    const [currentTab, setCurrentTab] = useState<"Today" | "Tomorrow" | "Upcoming" | "All">("Today");

    const [currentTasks, setCurrentTasks] = useState<Task[]>(taskState?.today_tasks || []);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

    const [addTaskPageOpen, setAddTaskPageOpen] = useState(false);

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
        <div className="bg-background text-foreground px-3 pb-35 min-h-screen flex flex-col">
            <div className="relative flex-1 flex flex-col">
                {addTaskPageOpen && (
                    <>
                        <div
                        className="fixed inset-0 z-40"
                        onClick={() => setAddTaskPageOpen(false)}
                        />
                        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 pointer-events-none">
                        <div className="pointer-events-auto w-full max-w-sm">
                            <AddTask />
                        </div>
                        </div>
                    </>
                )}

                <div className={`${addTaskPageOpen ? "opacity-50 blur pointer-events-none" : ""} gap-5 pt-5 flex flex-col flex-1 transition-opacity`}>
                    <Hero selected={currentTab} total={currentTasks.length} completed={completedTasks.length} handleAddTask={() => setAddTaskPageOpen(true)} />
                    <TaskTabs currentTab={currentTab} onTabChange={handleTabChange} />
                    <TaskList tasks={currentTasks} />
                </div>
            </div>
        </div>
    )
}
