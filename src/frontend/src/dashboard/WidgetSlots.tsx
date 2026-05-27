import { type ReactNode } from "react"

interface WidgetSlot {
  id: string
  component: ReactNode
}

interface WidgetSlotsProps {
  widgets: WidgetSlot[]
}

export default function WidgetSlots({ widgets }: WidgetSlotsProps) {
  const [hero, wide, smallA, smallB] = widgets

  if (!hero) return null

  return (
    <div className="flex-1 flex flex-col px-4 pb-4 gap-3 min-h-0">
      
      <div className="flex-1 min-h-0 rounded-2xl bg-card overflow-hidden">
        {hero.component}
      </div>

      {wide && (
        <div className="basis-[15%] shrink-0 min-h-0 rounded-2xl bg-card overflow-hidden">
          {wide.component}
        </div>
      )}

      {/* Smalls: 15% height */}
      {smallA && (
        <div className="basis-[25%] shrink-0 min-h-0 flex flex-row gap-3">
          <div className="flex-1 min-h-0 rounded-2xl bg-card overflow-hidden">
            {smallA.component}
          </div>
          {smallB && (
            <div className="flex-1 min-h-0 rounded-2xl bg-card overflow-hidden">
              {smallB.component}
            </div>
          )}
        </div>
      )}

    </div>
  )
}