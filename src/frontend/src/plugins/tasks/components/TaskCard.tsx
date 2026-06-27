// card for a task

import { Card } from "@/components/ui/card";
import { type Task } from "../useTasks";

export default function TaskCard({ task }: { task: Task }) {

    return (
        <Card className="p-4 pb-1 flex flex-col gap-2 border border-border/50 hover:border-border/80 transition-colors">
            <h1 className="font-semibold text-foreground">{task.title}</h1>
            <p className="text-sm text-muted-foreground">{task.description}</p>
            <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                <span className={`text-xs font-medium ${task.completed ? "text-green-500" : "text-red-500"}`}>
                    {task.completed && "Completed"}
                </span>
            </div>
        </Card>
    );
}