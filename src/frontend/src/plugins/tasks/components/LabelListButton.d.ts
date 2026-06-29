import { type TaskList, type Label } from "../useTasks";
export default function LabelListButton({ item, type, refetch, selected, onToggle }: {
    item: TaskList | Label;
    type: "list" | "label";
    refetch: () => void;
    selected: boolean;
    onToggle: () => void;
}): import("react/jsx-runtime").JSX.Element;
