import { useState, useRef } from "react";
import type { WeatherAtTime } from "../useWeather";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface PrecipitationGraphProps {
    dayHourlyWeather: WeatherAtTime[] | null;
    currentWeather: WeatherAtTime | null;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const time = new Date(label).toLocaleTimeString("en-GB", { "hour12": true, "hour": "numeric" })
    return (
        <div className="bg-card border border-border rounded-md px-2 py-1 text-sm font-medium flex flex-col">
            <span className="text-muted-foreground">{time}</span>
            <span className="text-muted-foreground">{payload[0].payload.precip_prob}% of
                <span className="text-foreground font-bold"> {payload[0].value}mm</span>
            </span>
        </div>
    );
};

export default function PrecipitationGraph({ dayHourlyWeather, currentWeather }: PrecipitationGraphProps) {
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

    return (
        <Card className="py-4" onClick={(e) => {
            if (chartRef.current && !chartRef.current.contains(e.target as Node)) {
                setTooltipActive(false);
            }
        }}
        >
            <CardHeader className="flex justify-center">
                <CardTitle className="text-muted-foreground font-bold">Precipitation</CardTitle>
            </CardHeader>

            {dayHourlyWeather ?
                <div ref={chartRef}>
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={dayHourlyWeather} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                            onClick={() => setTooltipActive(true)}>
                            <XAxis
                                dataKey="time"
                                tickFormatter={(t) => `${new Date(t).toLocaleTimeString("en-GB", { hour12: true, hour: "numeric" })}`}
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tick={{ fontSize: 12 }}
                                interval={3}
                            />
                            <Bar
                                dataKey="precip_mm"
                                radius={8}
                                cursor="default"
                                activeBar={false}
                                fill="#3b82f6"
                                shape={(props: any) => {
                                    const hour = dayHourlyWeather![props.index];
                                    const past = isPast(hour);
                                    return <rect
                                        {...props}
                                        fill={past ? "#6b7280" : "#3b82f6"}
                                        fillOpacity={past ? 0.5 : 1}
                                        rx={8}
                                        ry={8}
                                    />;
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} trigger="click" active={tooltipActive} cursor={false} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                : <></>}

        </Card>
    );
}