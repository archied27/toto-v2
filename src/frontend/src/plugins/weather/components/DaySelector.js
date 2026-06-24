import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dayLabels, weatherColour, weatherIcon } from "../utils";
function getStartDay(date) {
    // returns 0 for monday - 6 for sunday
    const d = new Date(date).getDay();
    return d === 0 ? 6 : d - 1;
}
function isToday(day) {
    if (day === null)
        return false;
    return "temp" in day;
}
function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day; // adjust for Sunday being 0
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}
export default function WeatherDaySelector({ twoWeekOverview, selectedDay, currentWeather, onSelectedDay }) {
    const [selectedWeek, setSelectedWeek] = useState(0);
    // what day is today e.g sunday = 6, monday = 0
    const startDay = twoWeekOverview ? getStartDay(twoWeekOverview[0].time) : 0;
    const today = new Date();
    const thisWeekStart = getWeekStart(today);
    const currentWeekStart = selectedWeek === 0 ? thisWeekStart : new Date(thisWeekStart.getTime() + 7 * 86400000);
    const weekLabels = ["This Week", "Next Week", "In Two Weeks"];
    const weekSlots = Array.from({ length: 7 }, (_, i) => {
        const dayOffset = i - startDay + (selectedWeek * 7);
        const isAvailable = dayOffset >= 0 && dayOffset <= 13;
        let data = isAvailable ? twoWeekOverview?.[dayOffset] ?? null : null;
        if (selectedWeek === 0 && dayOffset === 0 && currentWeather) {
            data = currentWeather;
        }
        return { slot: i, dayOffset, data, isAvailable };
    });
    const nextWeekAvailable = (startDay === 0 ? selectedWeek !== 1 : selectedWeek !== 2);
    return (_jsxs(Card, { className: "gap-4", children: [_jsxs(CardContent, { className: "flex align-center justify-between pb-5 border-b", children: [_jsx("h1", { className: "text-muted-foreground", children: weekLabels[selectedWeek] }), _jsxs("div", { className: "flex gap-4", children: [_jsx(ChevronLeft, { onClick: () => selectedWeek > 0 && setSelectedWeek(w => w - 1), className: `cursor-pointer ${selectedWeek === 0 ? "text-muted-foreground pointer-events-none" : "text-foreground"}` }), _jsx(ChevronRight, { onClick: () => nextWeekAvailable && setSelectedWeek(w => w + 1), className: `cursor-pointer ${!nextWeekAvailable ? "text-muted-foreground pointer-events-none" : "text-foreground"}` })] })] }), _jsx(CardContent, { className: "flex gap-3", children: weekSlots.map(({ slot, data, isAvailable }) => {
                    const date = new Date(currentWeekStart);
                    date.setDate(date.getDate() + slot);
                    const isSelected = data !== null && (selectedDay === data || isToday(data) && isToday(selectedDay));
                    const accentColour = data ? weatherColour(data.code) : "text.bg-primary/10";
                    if (!isAvailable) {
                        return (_jsx(Card, { className: "flex flex-1 flex-col \n                            items-center gap-4 px-1 py-2.5 opacity-25\n                            border-transparent shadow-none", children: _jsxs(CardContent, { className: "flex flex-col items-center gap-1 p-0", children: [_jsx("span", { className: "text-[11px] font-medium text-muted-foreground", children: dayLabels()[slot] }), _jsxs("span", { className: "text-[10px] text-muted-foreground/70", children: [date ? date.getDate() : "-", "/", date ? date.getMonth() : "-"] })] }) }, slot));
                    }
                    else {
                        return (_jsx(Card, { onClick: () => onSelectedDay(data), className: "flex-1 flex flex-col items-center rounded-sm gap-1 px-1 py-2.5 cursor-pointer shadow-none transition-colors duration-150", style: { background: isSelected ? `${accentColour}50` : "transparent" }, children: _jsxs(CardContent, { className: "flex flex-col items-center gap-0.5 p-0", children: [_jsx("span", { className: `text-[11px] font-medium ${isSelected ? "text-primary" : "text-muted-foreground"}`, children: isToday(data) ? "Now" : dayLabels()[slot] }), _jsxs("span", { className: "text-[10px] text-muted-foreground/70", children: [date.getDate(), "/", date.getMonth() + 1] }), _jsx("img", { src: weatherIcon(data ? data.code : 0, isToday(data) ? data.is_day : true), className: "w-8 h-8 object-cover opacity-80" }), _jsx("div", { className: "h-8 flex flex-col justify-center text-center", children: isToday(data) ? (_jsx("p", { className: "text-[13px] font-bold", style: { color: accentColour }, children: data.temp })) : (_jsxs(_Fragment, { children: [_jsx("p", { className: "text-[13px] font-medium text-green-400", children: data?.max_temp }), _jsx("p", { className: "text-[10px] text-blue-200", children: data?.min_temp })] })) })] }) }, slot));
                    }
                }) })] }));
}
