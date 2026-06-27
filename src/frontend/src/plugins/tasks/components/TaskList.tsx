import TaskCard from "./TaskCard";
import { type Task } from "../useTasks";

export default function TaskList({ tasks }: { tasks: Task[] }) {
    const isEmpty = tasks.length === 0;

    return (
        isEmpty ? (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">All Tasks Completed</p>
            </div>
        ) : (
            <div className="flex flex-col gap-5">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        )
    );
}