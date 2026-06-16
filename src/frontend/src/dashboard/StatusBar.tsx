import type { WeatherData } from "@/plugins/weather/useWeather";
import { weatherIcon } from "@/plugins/weather/utils";
import { useEffect, useState } from "react";

export default function StatusBar({ weather }: { weather: WeatherData | null })
{
    const [time, setTime] = useState(new Date());
    
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const current = weather?.current_weather;
        
    return (
        <div className="flex flex-col items-center pt-3 pb-2">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[15px] font-normal text-muted-foreground mt-0.5">
                    {current ?
                    <img src={weatherIcon(current.code, current.is_day)} className="w-6 h-6" /> :
                    <span className="font-semibold">-</span>}

                    <span className="font-semibold">{current ? current.temp : "-"}°</span>
                </div>

                <span className="text-[15px] font-normal text-muted-foreground">
                        {time.toLocaleDateString("en-GB", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                        })}
                </span>
            </div>

            <span className="text-[45px] font-semibold text-primary leading-tight">
                    {time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false})}
            </span>
        </div>
    )
}