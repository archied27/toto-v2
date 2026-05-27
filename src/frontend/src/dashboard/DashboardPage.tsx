import TasksSmall from "@/plugins/tasks/TasksSmall";
import SpotifyHero from "../plugins/spotify/SpotifyHero";
import StatusBar from "./StatusBar";
import WidgetSlots from "./WidgetSlots";

const widgets = [
    {'id': 'spotify', 'component': <SpotifyHero />},
    
]

export default function DashboardPage()
{
    return(
    <div className="h-screen w-full flex flex-col overflow-hidden bg-background">
        <div className="shrink-0">
            <StatusBar />
        </div>

        <div className="flex-1 min-h-0 w-full relative">
            <WidgetSlots widgets={widgets}/>
        </div>

    </div>)
}