interface HeroProps {
  selected: "Today" | "Tomorrow" | "Upcoming" | "All"
  total: number | null // total number of tasks
  completed: number | null  // completed number of tasks
}

export default function Hero({ selected, total, completed }: HeroProps) {
  return (
    <div className="sticky top-0 z-30 border-b border-border bg-background/80 px-5 pb-3 pt-[max(16px,env(safe-area-inset-top))] backdrop-blur-md">
      <div className="mt-0.5 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-balance">
            {selected}
          </h1>
          <div className="flex items-center gap-3">
            {total !== null && completed !== null && (
              <span className="text-[13px] font-medium text-muted-foreground tabular-nums">
                {completed}/{total} done
              </span>
            )}
          </div>
        </div>
    </div>
  )
}