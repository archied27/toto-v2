import { RefreshCwIcon } from "lucide-react";
import type { WeatherAtTime, WeatherDaily } from "../useWeather"
import { weatherColour, weatherIcon, weatherLabel } from "../utils";
import { useWebSocketContext } from "@/hooks/WebSocketContext";

function isToday(day: WeatherAtTime | WeatherDaily): day is WeatherAtTime{
    return "temp" in day;
}

export default function Hero({ day, refreshing, setRefreshing }: { day: WeatherAtTime | WeatherDaily | null, refreshing: boolean, setRefreshing: (refreshing: boolean) => void }) {
    const date = day ? new Date(day.time) : null;
    const is_date_today = day ? isToday(day) : false;
    const websocket = useWebSocketContext();    
    const dateString = date ? `${is_date_today ? "Today" : date.toLocaleDateString("en-GB", {"weekday": "short"})}, 
                               ${date.toLocaleDateString("en-GB", {"day": "numeric", "month": "long", "year": "numeric"})}` : "-"

    const temp = day 
        ? isToday(day)
            ? day.temp
            : day.avg_temp
        : null

    const is_day = day && isToday(day) ? day.is_day: true

    return (
        <div className="pt-3 pb-0">
            <div className="relative flex items-center w-full">
                <RefreshCwIcon className={`stroke-muted-foreground z-10${refreshing ? "animate-spin" : ""}`}
                onClick={() => { 
                    if (refreshing) return;
                    setRefreshing(true);
                    websocket.send({type: "weather.update"}); 
                }} />
                <p className="absolute inset-x-0 text-muted-foreground flex-1 text-[18px] font-[500] text-center">{dateString}</p>
            </div>
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2 p-3 px-2"
                        style={{
                            color: weatherColour(day ? day.code : 0)    
                    }}>
                        <h1 className="text-[25px] font-bold">{temp ? (temp) : "-"}°</h1>
                        <p>•</p>
                        <h1 className="text-[18px] font-medium">{weatherLabel(day ? day?.code: 0)}</h1>
                    </div>
                </div>

                <div className="text-right px-2a">
                    <img src={weatherIcon(day ? day.code: 0, day ? is_day : true)} className="w-15 h-15"/>
                </div>
            </div>
        </div>
    );
}