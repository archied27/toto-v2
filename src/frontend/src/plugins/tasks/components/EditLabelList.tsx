import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PenIcon } from "lucide-react"
import { useState } from "react"
import { HexColorPicker } from "react-colorful"
import { useEditLabel, useEditList } from "../useTasks"

export default function EditLabelList({ 
  type, 
  initialName, 
  initialColour, 
  id, 
  onDone,
  open, 
  onOpenChange 
}: { 
  type: "list" | "label"
  initialName: string
  initialColour: string
  id: number
  onDone?: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [name, setName] = useState(initialName);
  const [colour, setColour] = useState(initialColour);

  const { editList, loading: listLoading } = useEditList();
  const { editLabel, loading: labelLoading } = useEditLabel();
  const loading = listLoading || labelLoading;

  const onSubmit = async () => {
    if (!name.trim()) return;
    if (type === "list") await editList(id, name, colour);
    else await editLabel(id, name, colour);
    onDone?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {type === "list" ? "List" : "Label"}</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            value={name}
            placeholder="Name..."
            style={{ backgroundColor: colour }}
            className="text-foreground"
            onChange={(e) => setName(e.target.value)}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <PenIcon className="text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <HexColorPicker color={colour} onChange={setColour} />
            </PopoverContent>
          </Popover>
        </div>
        <Button
          className="bg-muted text-foreground"
          disabled={!name.trim() || loading}
          onClick={onSubmit}
        >
          {loading ? "Saving..." : `Save ${name}`}
        </Button>
      </DialogContent>
    </Dialog>
  );
}