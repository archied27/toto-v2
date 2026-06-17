import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { WeatherAtTime } from "../useWeather"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,  } from "recharts";
import { pollenColour, pollenLabel } from "../utils";
import { useRef, useState } from "react";

interface PollenGraphProps {
    dayHourlyWeather: WeatherAtTime[] | null;
    currentWeather: WeatherAtTime | null;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const time = new Date(label).toLocaleTimeString("en-GB", {"hour12": true, "hour": "numeric"})
  return (
    <div className="bg-card border border-border rounded-md px-2 py-1 text-sm font-medium flex flex-col">
      <span className="text-muted-foreground">{time}</span> 
      <span>{payload[0].value} g/m3</span>
    </div>
  );
};

export default function PollenGraph({ dayHourlyWeather, currentWeather }: PollenGraphProps) {
    const currentHour = currentWeather ? new Date(currentWeather.time).getHours() : null;
    const [tooltipActive, setTooltipActive] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);

    const isPast = (hourEntry: WeatherAtTime) => {
        if (currentHour === null) return false;
        const entryHour = new Date(hourEntry.time).getHours();
        const entryDate = hourEntry.time.slice(0, 10);
        const currentDate = currentWeather!.time.slice(0, 10);
        
        return entryDate === currentDate && entryHour < currentHour;
    };

    const gradientStops = dayHourlyWeather ? dayHourlyWeather.map((hour, i) => ({
        offset: `${(i / (dayHourlyWeather.length - 1)) * 100}%`,
        color: isPast(hour) ? "#6b7280" : pollenColour(hour.grass_pollen),
        opacity: isPast(hour) ? 0.5 : 1,  // grey out past hours
    })): null;

    const maxPollen = dayHourlyWeather ? Math.max(...dayHourlyWeather.map(h => h.grass_pollen)) : null;

    return (
        <Card className="py-4" onClick={(e) => {
            if (chartRef.current && !chartRef.current.contains(e.target as Node)) {
            setTooltipActive(false);
            }}}
        >
            <CardHeader className="flex flex-row">
                <CardTitle className="text-muted-foreground font-bold flex-1">Grass Pollen Levels</CardTitle>
                <CardTitle className="font-bold text-right"
                style={{ color: maxPollen !== null ? pollenColour(maxPollen) : undefined }}>{maxPollen ? pollenLabel(maxPollen) : "-"}</CardTitle>
            </CardHeader>

        
            {dayHourlyWeather && gradientStops ?  
            <div ref={chartRef}>
            <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={dayHourlyWeather} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                onClick={() => setTooltipActive(true)}>
                    <defs>
                        <linearGradient id="pollenGradient" x1="0" y1="0" x2="1" y2="0">
                        {gradientStops.map((stop, i) => (
                            <stop key={i} offset={stop.offset} stopColor={stop.color} stopOpacity={stop.opacity} />
                        ))}
                        </linearGradient>
                        <linearGradient id="pollenFill" x1="0" y1="0" x2="1" y2="0">
                        {gradientStops.map((stop, i) => (
                            <stop key={i} offset={stop.offset} stopColor={stop.color} stopOpacity={stop.opacity * 0.2} />
                        ))}
                        </linearGradient>
                    </defs>
                    <Area
                        type="linear"
                        dataKey="grass_pollen"
                        stroke="url(#pollenGradient)"
                        fill="url(#pollenFill)"
                        strokeWidth={5}
                        dot={false}
                        activeDot={{r:4, strokeWidth:1.5, fill:"white", stroke:"black", opacity:tooltipActive ? 1: 0}}
                    />
                    <XAxis
                        dataKey="time"
                        tickFormatter={(t) => `${new Date(t).toLocaleTimeString("en-GB", {hour12: true, hour: "numeric"})}`}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12 }}
                        padding={{ left:20, right:20 }}
                        interval={3}

                    />
                    <YAxis hide domain={[0,150]}/>
                    <Tooltip content={<CustomTooltip />} trigger="click" active={tooltipActive}/>
                    </AreaChart>
                </ResponsiveContainer>
                </div>
: <></>}
        </Card>
    )
}