import { useState, useEffect } from "react";
import { useWeather, type WeatherData } from "@/plugins/weather/useWeather";
import { weatherIcon } from "@/plugins/weather/utils";
import { useNavigation } from "@/hooks/NavigationContext";

export default function IdleClock({ weather }: { weather: WeatherData | null })
{
    const [time, setTime] = useState(new Date());
    const { navigate } = useNavigation();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const current = weather?.current_weather;

    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center pt-3 pb-2 -translate-y-20">
                <span className="text-[18px] font-normal text-muted-foreground">
                    {time.toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                    })}
                </span>

                <span className="text-[74px] font-semibold text-primary leading-tight">
                    {time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false})}
                </span>

                <div className="flex items-center gap-1.5 text-[18px] font-normal text-muted-foreground mt-0.5"
                onClick={() => navigate("weather", { today: true })}>
                    {current ?
                    <img src={weatherIcon(current.code, current.is_day)} className="w-10 h-10" /> :
                    <span className="font-semibold">-</span>}

                    <span className="font-semibold">{current ? current.temp : "-"}°</span>
                    
                </div>
            </div>
        </div>
    )
}