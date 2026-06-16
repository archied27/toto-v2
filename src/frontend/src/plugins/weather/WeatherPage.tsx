import { useEffect, useMemo, useState } from "react";
import Hero from "./components/Hero";
import { useWeather, type WeatherAtTime, type WeatherDaily, type WeatherData } from "./useWeather";
import WeatherDaySelector from "./components/DaySelector";
import TemperatureGraph from "./components/TemperatureGraph";
import PrecipitationGraph from "./components/PrecipitationGraph";
import UVGraph from "./components/UVGraph";

export default function WeatherPage() {
    const { weather } = useWeather();
    const [selectedDay, setSelectedDay] = useState<WeatherAtTime | WeatherDaily | null>(null);

    const dayHours = useMemo(() => {
        if (!weather?.two_week_hourly || !selectedDay) return null;
        const targetDate = selectedDay.time.slice(0, 10);
        return weather.two_week_hourly.filter(h => h.time.slice(0, 10) === targetDate);
    }, [weather?.two_week_hourly, selectedDay]);

    const hasPrecipitation = useMemo(() => {
        return dayHours?.some(h => h.precip_mm > 0) ?? false;
    }, [dayHours]);

    const hasUV = useMemo(() => {
        return dayHours?.some(h => h.uv > 0) ?? false;
    }, [dayHours]);

    

    useEffect(() => {
        if(weather && selectedDay == null) {
            setSelectedDay(weather.current_weather);
        }
    }, [weather])

    return (
        <div className="bg-background text-foreground px-3 flex flex-col gap-5 pb-35">
            <Hero day={selectedDay} />

            <WeatherDaySelector twoWeekOverview={weather?.two_week_overview} 
            currentWeather={weather?.current_weather ?? null} 
            onSelectedDay={(day) => setSelectedDay(day)} selectedDay={selectedDay} />

            <TemperatureGraph currentWeather={weather?.current_weather ?? null}
            dayHourlyWeather={dayHours}/>

            {hasPrecipitation && (<PrecipitationGraph currentWeather={weather?.current_weather ?? null}
            dayHourlyWeather={dayHours}/>)}

            {hasUV && (<UVGraph currentWeather={weather?.current_weather ?? null}
            dayHourlyWeather={dayHours}/>)}

        </div>
    );
}