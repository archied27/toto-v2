import { Card, CardContent } from "@/components/ui/card";
import type { WeatherAtTime, WeatherDaily } from "../useWeather";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { dayLabels, weatherColour, weatherIcon } from "../utils";

interface WeatherDaySelectorProps {
    twoWeekOverview: WeatherDaily[] | undefined;
    selectedDay: WeatherDaily | WeatherAtTime | null;
    currentWeather: WeatherAtTime | null;
    onSelectedDay: (day: WeatherDaily | WeatherAtTime |  null) => void;
}

function getStartDay(date: string): number {
    // returns 0 for monday - 6 for sunday
    const d = new Date(date).getDay();
    return d === 0 ? 6 : d-1;
}

function isToday(day: WeatherAtTime | WeatherDaily | null): day is WeatherAtTime{
    if (day === null) return false;
    return "temp" in day;
}

function getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day; // adjust for Sunday being 0
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

export default function WeatherDaySelector({ twoWeekOverview, selectedDay, currentWeather, onSelectedDay }: WeatherDaySelectorProps) {
    const [selectedWeek, setSelectedWeek] = useState(0);
    // what day is today e.g sunday = 6, monday = 0
    const startDay = twoWeekOverview ? getStartDay(twoWeekOverview[0].time) : 0;
    
    const today = new Date();
    const thisWeekStart = getWeekStart(today);
    const currentWeekStart = selectedWeek === 0 ? thisWeekStart : new Date(thisWeekStart.getTime() + 7 * 86400000);
    
    const weekLabels = ["This Week", "Next Week", "In Two Weeks"]

    const weekSlots = Array.from({ length: 7 }, (_, i) => {
        const dayOffset = i - startDay + (selectedWeek * 7);
        const isAvailable = dayOffset >= 0 && dayOffset <= 13;
        let data: WeatherDaily | WeatherAtTime | null = isAvailable ? twoWeekOverview?.[dayOffset] ?? null : null;

        if (selectedWeek === 0 && dayOffset === 0 && currentWeather) {
            data = currentWeather;
        }

        return { slot: i, dayOffset, data, isAvailable };
    });

    const nextWeekAvailable = (startDay === 0 ? selectedWeek!==1 : selectedWeek!==2);

    return (
        <Card className="gap-4">
            <CardContent className="flex align-center justify-between pb-5 border-b">
                <h1 className="text-muted-foreground">{weekLabels[selectedWeek]}</h1>
                <div className="flex gap-4">
                    <ChevronLeft 
                        onClick={() => selectedWeek > 0 && setSelectedWeek(w => w-1)}
                        className={`cursor-pointer ${selectedWeek === 0 ? "text-muted-foreground pointer-events-none" : "text-foreground"}`} />
                    <ChevronRight
                        onClick={() => nextWeekAvailable && setSelectedWeek(w => w + 1)}
                        className={`cursor-pointer ${!nextWeekAvailable ? "text-muted-foreground pointer-events-none" : "text-foreground"}`}
                    />
                </div>

            </CardContent>

            <CardContent className="flex gap-3">
                {weekSlots.map(({ slot, data, isAvailable }) => {
                    const date = new Date(currentWeekStart);
                    date.setDate(date.getDate() + slot);
                    const isSelected = data !== null && (selectedDay === data || isToday(data) && isToday(selectedDay));
                    const accentColour = data ? weatherColour(data.code) : "text.bg-primary/10";

                    if (!isAvailable) {
                        return (
                            <Card key={slot} className="flex flex-1 flex-col 
                            items-center gap-4 px-1 py-2.5 opacity-25
                            border-transparent shadow-none">
                                <CardContent className="flex flex-col items-center gap-1 p-0">
                                    <span className="text-[11px] font-medium text-muted-foreground">
                                        {dayLabels()[slot]}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground/70">
                                        {date ? date.getDate() : "-"}/{date ? date.getMonth() : "-"}
                                    </span>
                                </CardContent>
                            </Card>
                        );
                    }

                    else {
                        return (
                            <Card
                                key={slot}
                                onClick={() => onSelectedDay(data)}
                                className={"flex-1 flex flex-col items-center rounded-sm gap-1 px-1 py-2.5 cursor-pointer shadow-none transition-colors duration-150"}
                                style={{background: isSelected ? `${accentColour}50`: "transparent"}}
                            >
                                <CardContent className="flex flex-col items-center gap-0.5 p-0">
                                    <span className={`text-[11px] font-medium ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                                        {isToday(data) ?  "Now" :dayLabels()[slot]}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground/70">
                                        {date.getDate()}/{date.getMonth() + 1}
                                    </span>
                                    <img src={weatherIcon(data ? data.code: 0, isToday(data) ? data.is_day : true)} className="w-8 h-8 object-cover opacity-80" />
                                    <div className="h-8 flex flex-col justify-center text-center">
                                        {isToday(data) ? (
                                            <p className="text-[13px] font-bold" style={{color: accentColour}}>{data.temp}</p>
                                        ): (
                                            <>
                                                <p className="text-[13px] font-medium text-green-400">{data?.max_temp}</p>
                                                <p className="text-[10px] text-blue-200">{data?.min_temp}</p>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    }
                })}
            </CardContent>
        </Card>
    )
}