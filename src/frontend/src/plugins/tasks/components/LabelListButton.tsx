import { type TaskList, type Label, useDeleteList, useDeleteLabel } from "../useTasks";
import { Button } from "@/components/ui/button";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { PenIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import EditLabelList from "./EditLabelList";

export default function LabelListButton({ item, type, refetch, selected, onToggle }: { item: TaskList | Label; type: "list" | "label"; refetch: () => void; selected: boolean; onToggle: () => void })
{
    const [editOpen, setEditOpen] = useState(false);

    const { deleteList } = useDeleteList();
    const { deleteLabel } = useDeleteLabel();

    const handleDelete = async () => {
        if (type === "list") {
            await deleteList(item.id);
        } else {
            await deleteLabel(item.id);
        }
        refetch();
    }

    return (
        <>
            <EditLabelList
                type={type}
                initialName={item.name}
                initialColour={item.colour}
                id={item.id}
                onDone={refetch}
                open={editOpen}
                onOpenChange={setEditOpen}
            />
            
            <ContextMenu>
                <ContextMenuTrigger asChild>
                    <Button style={{ backgroundColor: item.colour }} className={selected ? "ring-1 ring-white" : ""} onClick={onToggle}>
                        <p>{item.name}</p>
                    </Button>
                </ContextMenuTrigger>

                <ContextMenuContent className="flex flex-col w-auto text-muted-foreground">
                    <ContextMenuItem onClick={() => setEditOpen(true)}>
                        <PenIcon />
                        Edit
                    </ContextMenuItem>
                    <ContextMenuItem onClick={handleDelete} className="text-destructive">
                        <TrashIcon />
                        Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </>
    );
}