import { Card } from "@/components/ui/card"

export default function SpotifyHero() {
  return (
    // Use bg-transparent and border-none to let WidgetSlots handle the wrapper styling
    <Card className="h-full w-full border-none shadow-none bg-transparent flex flex-col sm:flex-row items-center gap-6 p-6">
      
      {/* Album Art: Aspect ratio locked, max-height ensures it never pushes the page down */}
      <div className="relative aspect-square h-3/5 sm:h-full max-h-[180px] rounded-xl overflow-hidden shadow-md shrink-0 bg-muted">
        <img 
          src="https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36" 
          alt="Album Art"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Track Info */}
      <div className="flex-1 flex flex-col justify-center min-w-0 text-center sm:text-left w-full">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Now Playing</span>
        <h1 className="text-xl sm:text-2xl font-bold truncate mt-1">Blinding Lights</h1>
        <p className="text-sm text-muted-foreground truncate">The Weeknd</p>
        
        {/* Mock Progress Bar */}
        <div className="w-full bg-muted h-1.5 rounded-full mt-4 overflow-hidden">
          <div className="bg-primary h-full w-1/3 rounded-full" />
        </div>
      </div>

    </Card>
  )
}