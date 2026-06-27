import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PenIcon, PlusIcon } from "lucide-react"
import { useState } from "react"
import { HexColorPicker } from "react-colorful"
import { useAddLabel, useAddList, type TaskList, type Label } from "../useTasks"

export default function AddLabelList({ type, onAdd }: 
    { type: "Label" | "List", onAdd?: () => void;}) {

    const [colour, setColour] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [open, setOpen] = useState(false);

    const { addList, loading: listLoading } = useAddList()
    const { addLabel, loading: labelLoading } = useAddLabel()

    const loading = listLoading || labelLoading;

    const onSubmit = async () => {
        if(!name.trim()) return;
        let result = null;
        if (type == "List")
        {
            await addList(name, colour ?? "#aabbcc");
        }
        else
        {
            await addLabel(name, colour ?? "#ff0000")
        }
        onAdd?.();
        setName("");
        setColour(null);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button variant={"ghost"} className="bg-muted">
                    <PlusIcon className="text-muted-foreground" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        New {type}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex gap-2">
                    <Input 
                        placeholder={`${type} Name...`} 
                        style={{ backgroundColor: colour ? colour : "transparent" }} 
                        className="text-foreground"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Popover>
                        <PopoverTrigger>
                            <Button variant={"outline"}>
                                <PenIcon className="text-muted-foreground" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-full h-full">
                            <HexColorPicker color={colour ? colour : "#ff0000"} onChange={setColour} />
                        </PopoverContent>
                    </Popover>
                </div>

                <Button 
                    className="bg-muted text-foreground border-xl"
                    disabled={!name.trim || loading || !colour}
                    onClick={onSubmit}
                >
                    {loading ? `Adding ${name}` : `Add ${name}`}
                </Button>

            </DialogContent>
        </Dialog>
    )
}