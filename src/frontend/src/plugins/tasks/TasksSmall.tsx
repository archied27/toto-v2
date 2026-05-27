import { Card } from "@/components/ui/card"

export default function TasksSmall() {
  return (
    // Items-center keeps content perfectly centered vertically in tight slots
    <Card className="h-full w-full border-none shadow-none bg-transparent flex items-center justify-between px-6 py-2">
      
      {/* Left side: Status & Title */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-4 w-4 rounded-full border-2 border-primary shrink-0" />
        <div className="min-w-0">
          <h1 className="font-semibold text-sm sm:text-base truncate">Due Today: Review PRs</h1>
          <p className="text-xs text-muted-foreground hidden sm:block truncate">Project Dashboard styling</p>
        </div>
      </div>

      {/* Right side: Badge Count */}
      <span className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full font-medium shrink-0">
        3 left
      </span>

    </Card>
  )
}