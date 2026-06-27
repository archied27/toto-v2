import { PlusIcon } from "lucide-react";

export default function AddTaskButton({ onClick }: { onClick?: () => void }) {

    return (
        <PlusIcon 
            className="h-6 w-6 text-primary" 
            onClick={onClick}
        />
    );
}