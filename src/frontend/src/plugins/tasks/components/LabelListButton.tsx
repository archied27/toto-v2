import { type TaskList, type Label, useDeleteList, useDeleteLabel } from "../useTasks";
import { Button } from "@/components/ui/button";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { PenIcon, TrashIcon } from "lucide-react";

export default function LabelListButton({ item, type, refetch }: { item: TaskList | Label; type: "list" | "label"; refetch: () => void })
{
    const { deleteList } = useDeleteList();
    const { deleteLabel } = useDeleteLabel();

    const handleDelete = async () => {
        console.log("Deleting item:", item);
        if (type === "list") {
            await deleteList(item.id);
        } else {
            await deleteLabel(item.id);
        }
        refetch();
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Button style={{ backgroundColor: item.colour }} className="">
                    <p>{item.name}</p>
                </Button>
            </ContextMenuTrigger>

            <ContextMenuContent className="flex flex-col w-auto text-muted-foreground">
                <ContextMenuItem>
                    <PenIcon />
                    Edit
                </ContextMenuItem>
                <ContextMenuItem onClick={handleDelete} className="text-destructive">
                    <TrashIcon />
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}