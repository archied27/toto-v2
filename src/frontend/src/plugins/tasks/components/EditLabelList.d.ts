export default function EditLabelList({ type, initialName, initialColour, id, onDone, open, onOpenChange }: {
    type: "list" | "label";
    initialName: string;
    initialColour: string;
    id: number;
    onDone?: () => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}): import("react/jsx-runtime").JSX.Element;
