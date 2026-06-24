import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, } from "recharts";
import { pollenColour, pollenLabel } from "../utils";
import { useRef, useState } from "react";
const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length)
        return null;
    const time = new Date(label).toLocaleTimeString("en-GB", { "hour12": true, "hour": "numeric" });
    return (_jsxs("div", { className: "bg-card border border-border rounded-md px-2 py-1 text-sm font-medium flex flex-col", children: [_jsx("span", { className: "text-muted-foreground", children: time }), _jsxs("span", { children: [payload[0].value, " g/m3"] })] }));
};
export default function PollenGraph({ dayHourlyWeather, currentWeather }) {
    const currentHour = currentWeather ? new Date(currentWeather.time).getHours() : null;
    const [tooltipActive, setTooltipActive] = useState(false);
    const chartRef = useRef(null);
    const isPast = (hourEntry) => {
        if (currentHour === null)
            return false;
        const entryHour = new Date(hourEntry.time).getHours();
        const entryDate = hourEntry.time.slice(0, 10);
        const currentDate = currentWeather.time.slice(0, 10);
        return entryDate === currentDate && entryHour < currentHour;
    };
    const gradientStops = dayHourlyWeather ? dayHourlyWeather.map((hour, i) => ({
        offset: `${(i / (dayHourlyWeather.length - 1)) * 100}%`,
        color: isPast(hour) ? "#6b7280" : pollenColour(hour.grass_pollen),
        opacity: isPast(hour) ? 0.5 : 1, // grey out past hours
    })) : null;
    const maxPollen = dayHourlyWeather ? Math.max(...dayHourlyWeather.map(h => h.grass_pollen)) : null;
    return (_jsxs(Card, { className: "py-4", onClick: (e) => {
            if (chartRef.current && !chartRef.current.contains(e.target)) {
                setTooltipActive(false);
            }
        }, children: [_jsxs(CardHeader, { className: "flex flex-row", children: [_jsx(CardTitle, { className: "text-muted-foreground font-bold flex-1", children: "Grass Pollen Levels" }), _jsx(CardTitle, { className: "font-bold text-right", style: { color: maxPollen !== null ? pollenColour(maxPollen) : undefined }, children: maxPollen ? pollenLabel(maxPollen) : "-" })] }), dayHourlyWeather && gradientStops ?
                _jsx("div", { ref: chartRef, children: _jsx(ResponsiveContainer, { width: "100%", height: 120, children: _jsxs(AreaChart, { data: dayHourlyWeather, margin: { top: 10, right: 0, left: 0, bottom: 0 }, onClick: () => setTooltipActive(true), children: [_jsxs("defs", { children: [_jsx("linearGradient", { id: "pollenGradient", x1: "0", y1: "0", x2: "1", y2: "0", children: gradientStops.map((stop, i) => (_jsx("stop", { offset: stop.offset, stopColor: stop.color, stopOpacity: stop.opacity }, i))) }), _jsx("linearGradient", { id: "pollenFill", x1: "0", y1: "0", x2: "1", y2: "0", children: gradientStops.map((stop, i) => (_jsx("stop", { offset: stop.offset, stopColor: stop.color, stopOpacity: stop.opacity * 0.2 }, i))) })] }), _jsx(Area, { type: "linear", dataKey: "grass_pollen", stroke: "url(#pollenGradient)", fill: "url(#pollenFill)", strokeWidth: 5, dot: false, activeDot: { r: 4, strokeWidth: 1.5, fill: "white", stroke: "black", opacity: tooltipActive ? 1 : 0 } }), _jsx(XAxis, { dataKey: "time", tickFormatter: (t) => `${new Date(t).toLocaleTimeString("en-GB", { hour12: true, hour: "numeric" })}`, tickLine: false, axisLine: false, tick: { fontSize: 12 }, padding: { left: 20, right: 20 }, interval: 3 }), _jsx(YAxis, { hide: true, domain: [0, 150] }), _jsx(Tooltip, { content: _jsx(CustomTooltip, {}), trigger: "click", active: tooltipActive })] }) }) })
                : _jsx(_Fragment, {})] }));
}
