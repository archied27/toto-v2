interface TaskTabsProps {
    currentTab: "Today" | "Tomorrow" | "Upcoming" | "All";
    onTabChange: (tab: "Today" | "Tomorrow" | "Upcoming" | "All") => void;
}
export default function TaskTabs({ currentTab, onTabChange }: TaskTabsProps): import("react/jsx-runtime").JSX.Element;
export {};
