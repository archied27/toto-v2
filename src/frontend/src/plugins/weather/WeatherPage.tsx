import { useEffect, useMemo, useRef, useState } from "react";
import Hero from "./components/Hero";
import { useWeather, type WeatherAtTime, type WeatherDaily } from "./useWeather";
import WeatherDaySelector from "./components/DaySelector";
import TemperatureGraph from "./components/TemperatureGraph";
import PrecipitationGraph from "./components/PrecipitationGraph";
import UVGraph from "./components/UVGraph";
import WeatherOverview from "./components/Overview";
import PollenGraph from "./components/PollenGraph";
import { useNavigation } from "@/hooks/NavigationContext";
import { scrollToRef } from "@/hooks/scrollToRef";

function isToday(day: WeatherAtTime | WeatherDaily | null): day is WeatherAtTime{
    if (day === null) return false;
    return "temp" in day;
}

export default function WeatherPage() {
    const { weather, refreshing, setRefreshing } = useWeather();
    const [selectedDay, setSelectedDay] = useState<WeatherAtTime | WeatherDaily | null>(null);

    const { params } = useNavigation();

    const uvRef = useRef<HTMLDivElement>(null);
    const pollenRef = useRef<HTMLDivElement>(null);
    const precipitationRef = useRef<HTMLDivElement>(null);

    const dayHours = useMemo(() => {
        if (!weather?.two_week_hourly || !selectedDay) return null;
        const targetDate = selectedDay.time.slice(0, 10);
        return weather.two_week_hourly.filter(h => h.time.slice(0, 10) === targetDate);
    }, [weather?.two_week_hourly, selectedDay]);

    const hasPrecipitation = useMemo(() => {
        return dayHours?.some(h => h.precip_mm > 0) ?? false;
    }, [dayHours]);

    const pollenMax = dayHours ? Math.max(
        ...dayHours.map((h) => h.grass_pollen),
        0
    ) : 0;

    const hasUV = useMemo(() => {
        return dayHours?.some(h => h.uv > 0) ?? false;
    }, [dayHours]);

    useEffect(() => {
        if(weather && selectedDay == null) {
            setSelectedDay(weather.current_weather);
        }
    }, [weather])

    useEffect(() => {
        if (params?.today === true && weather) { setSelectedDay(weather?.current_weather) };
        if (params?.scrollTo === "uv" && uvRef.current) {
            scrollToRef(uvRef);
        }
        else if (params?.scrollTo === "pollen" && pollenRef.current) {
            scrollToRef(pollenRef);
        }
        else if (params?.scrollTo === "precipitation" && precipitationRef.current) {
            scrollToRef(precipitationRef);
        }

    }, [params])

    return (
        <div className="bg-background text-foreground px-3 flex flex-col gap-5 pb-35">
            <Hero day={selectedDay} refreshing={refreshing} setRefreshing={setRefreshing} />

            <WeatherDaySelector twoWeekOverview={weather?.two_week_overview} 
            currentWeather={weather?.current_weather ?? null} 
            onSelectedDay={(day) => setSelectedDay(day)} selectedDay={selectedDay} />
            
            <WeatherOverview day={isToday(selectedDay) ? weather?.two_week_overview[0] : selectedDay} 
            current_weather={weather?.current_weather} max_pollen={pollenMax}/>

            <TemperatureGraph currentWeather={weather?.current_weather ?? null}
            dayHourlyWeather={dayHours} />

            {hasPrecipitation && (
                <div ref={precipitationRef}>
                    <PrecipitationGraph currentWeather={weather?.current_weather ?? null}
                    dayHourlyWeather={dayHours} />
                </div>
            )}
            

            {hasUV && (
                <div ref={uvRef}>
                    <UVGraph currentWeather={weather?.current_weather ?? null}
                    dayHourlyWeather={dayHours} />
                </div>
            )}
            

            {pollenMax > 0 && (
                <div ref={pollenRef}>
                    <PollenGraph currentWeather={weather?.current_weather ?? null}
                    dayHourlyWeather={dayHours} />
                </div>
            )} 
            

        </div>
    );
}