import TasksSmall from "@/plugins/tasks/TasksSmall";
import SpotifyHero from "../plugins/spotify/SpotifyHero";
import StatusBar from "./StatusBar";
import WidgetSlots from "./WidgetSlots";
import IdleClock from "./IdleClock";
import type { ReactNode } from "react";
import { useWeather } from "@/plugins/weather/useWeather";

interface WidgetSlot {
  id: string
  component: ReactNode
}

const widgets: WidgetSlot[] = [
    {'id': 'spotify', 'component': <SpotifyHero />},
    {'id': 'tasks', 'component': <TasksSmall />},
    {'id': 'spotify', 'component': <TasksSmall />}
]

export default function DashboardPage()
{
    const { weather } = useWeather();

    return(
    <div className="h-screen w-full flex flex-col overflow-hidden bg-background">
        {widgets.length>0 ? 
        <>        
            <div className="shrink-0">
                <StatusBar weather={ weather  }/>
            </div>

            <div className="flex-1 min-h-0 w-full relative">
                <WidgetSlots widgets={widgets}/>
            </div> 
        </>:
        <IdleClock weather={ weather }/>}
        

    </div>)
}