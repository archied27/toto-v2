interface HeroProps {
  selected: "Today" | "Tomorrow" | "Upcoming" | "All"
  total: number | null // total number of tasks
  completed: number | null  // completed number of tasks
}

export default function Hero({ selected, total, completed }: HeroProps) {
  const selectedLabels = {
    "Today": "Today",
    "Tomorrow": "Tomorrow",
    "Upcoming": "Upcoming Tasks",
    "All": "All Tasks"
  }

  return (
    <div className="sticky top-0 z-30 border-b border-border bg-background/80 px-5 pb-3 backdrop-blur-md">
      <div className="mt-0.5 flex items-center justify-between gap-3">
          <h1 
            key={selected}
            className="animate-fade-slide-in text-2xl font-semibold tracking-tight text-balance"
          >
            {selectedLabels[selected]}
          </h1>
          <div className="flex items-center gap-3">
            {total !== null && completed !== null && (
              <span 
                key={`${completed}-${total}`}
                className="animate-fade-slide-in text-[13px] font-medium text-muted-foreground tabular-nums ease-in-out"
              >
                {completed}/{total} done
              </span>
            )}
          </div>
        </div>
    </div>
  )
}