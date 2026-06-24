import Hero from "./components/Hero";

export default function TasksPage() {
    return (
        <div className="bg-background text-foreground px-3 flex flex-col gap-5 pb-35">
            <Hero selected="Today" total={10} completed={5} />
        </div>
    )
}