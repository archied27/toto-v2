// card for a task

import { Card } from "@/components/ui/card";
import { type Task } from "../useTasks";

import { format, isToday, isTomorrow, isThisWeek, parseISO, startOfWeek, endOfWeek, addWeeks } from "date-fns";
import { getTextColour } from "../utils";

export function formatTaskDate(isoString: string): string {
  const date = parseISO(isoString);
  const now = new Date();

  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";

  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, "EEEE");
  }

  const nextWeekStart = startOfWeek(addWeeks(now, 1), { weekStartsOn: 1 });
  const nextWeekEnd = endOfWeek(addWeeks(now, 1), { weekStartsOn: 1 });

  if (date >= nextWeekStart && date <= nextWeekEnd) {
    return `Next ${format(date, "EEEE")}`;
  }

  return format(date, "do MMMM yyyy");
}

export default function TaskCard({ task }: { task: Task }) {

    return (
        <Card className="p-2 flex flex-col gap-2 border border-border/50 hover:border-border/80 transition-colors">
            <h1 className="font-semibold text-foreground">{task.title}</h1>

            <div className="flex flex-row">
                <span className="text-xs text-muted-foreground">{task.to_do_date && formatTaskDate(task.to_do_date)}</span>
                {task.to_do_date && task.due_date && <span className="text-xs text-muted-foreground text-bold mx-1">|</span>}
                <span className="text-xs text-muted-foreground">{task.due_date && "Due " + formatTaskDate(task.due_date)}</span>
            </div>

            <div className="flex flex-row flex-wrap gap-1">
                {task.task_list && (
                    <span style={{ backgroundColor: task.task_list.colour, color: getTextColour(task.task_list.colour) }} className="px-2 py-0.5 rounded-full text-xs text-foreground">
                            {task.task_list.name}
                    </span>
                )}

                {task.labels?.map(label => (
                    <span key={label.id} style={{ backgroundColor: label.colour, color: getTextColour(label.colour) }} className="px-2 py-0.5 rounded-full text-xs text-foreground">
                        {label.name}
                    </span>
                ))}
            </div>
        </Card>
    );
}