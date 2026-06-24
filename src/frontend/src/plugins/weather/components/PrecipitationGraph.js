import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length)
        return null;
    const time = new Date(label).toLocaleTimeString("en-GB", { "hour12": true, "hour": "numeric" });
    return (_jsxs("div", { className: "bg-card border border-border rounded-md px-2 py-1 text-sm font-medium flex flex-col", children: [_jsx("span", { className: "text-muted-foreground", children: time }), _jsxs("span", { className: "text-muted-foreground", children: [payload[0].payload.precip_prob, "% of", _jsxs("span", { className: "text-foreground font-bold", children: [" ", payload[0].value, "mm"] })] })] }));
};
export default function PrecipitationGraph({ dayHourlyWeather, currentWeather }) {
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
    return (_jsxs(Card, { className: "py-4", onClick: (e) => {
            if (chartRef.current && !chartRef.current.contains(e.target)) {
                setTooltipActive(false);
            }
        }, children: [_jsx(CardHeader, { className: "flex justify-center", children: _jsx(CardTitle, { className: "text-muted-foreground font-bold", children: "Precipitation" }) }), dayHourlyWeather ?
                _jsx("div", { ref: chartRef, children: _jsx(ResponsiveContainer, { width: "100%", height: 120, children: _jsxs(BarChart, { data: dayHourlyWeather, margin: { top: 10, right: 0, left: 0, bottom: 0 }, onClick: () => setTooltipActive(true), children: [_jsx(XAxis, { dataKey: "time", tickFormatter: (t) => `${new Date(t).toLocaleTimeString("en-GB", { hour12: true, hour: "numeric" })}`, tickLine: false, tickMargin: 10, axisLine: false, tick: { fontSize: 12 }, interval: 3 }), _jsx(Bar, { dataKey: "precip_mm", radius: 8, cursor: "default", activeBar: false, fill: "#3b82f6", shape: (props) => {
                                        const hour = dayHourlyWeather[props.index];
                                        const past = isPast(hour);
                                        return _jsx("rect", { ...props, fill: past ? "#6b7280" : "#3b82f6", fillOpacity: past ? 0.5 : 1, rx: 8, ry: 8 });
                                    } }), _jsx(Tooltip, { content: _jsx(CustomTooltip, {}), trigger: "click", active: tooltipActive, cursor: false })] }) }) })
                : _jsx(_Fragment, {})] }));
}
