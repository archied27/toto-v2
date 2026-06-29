interface HeroProps {
    selected: "Today" | "Tomorrow" | "Upcoming" | "All";
    total: number | null;
    completed: number | null;
    handleAddTask?: () => void;
}
export default function Hero({ selected, total, completed, handleAddTask }: HeroProps): import("react/jsx-runtime").JSX.Element;
export {};
