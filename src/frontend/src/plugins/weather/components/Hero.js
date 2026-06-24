import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RefreshCwIcon } from "lucide-react";
import { weatherColour, weatherIcon, weatherLabel } from "../utils";
import { useWebSocketContext } from "@/hooks/WebSocketContext";
function isToday(day) {
    return "temp" in day;
}
export default function Hero({ day, refreshing, setRefreshing }) {
    const date = day ? new Date(day.time) : null;
    const is_date_today = day ? isToday(day) : false;
    const websocket = useWebSocketContext();
    const dateString = date ? `${is_date_today ? "Today" : date.toLocaleDateString("en-GB", { "weekday": "short" })}, 
                               ${date.toLocaleDateString("en-GB", { "day": "numeric", "month": "long", "year": "numeric" })}` : "-";
    const temp = day
        ? isToday(day)
            ? day.temp
            : day.avg_temp
        : null;
    const is_day = day && isToday(day) ? day.is_day : true;
    return (_jsxs("div", { className: "pt-3 pb-0", children: [_jsxs("div", { className: "relative flex items-center w-full", children: [_jsx(RefreshCwIcon, { className: `stroke-muted-foreground z-10 ${refreshing ? "animate-spin" : ""}`, onClick: () => {
                            if (refreshing)
                                return;
                            setRefreshing(true);
                            websocket.send({ type: "weather.update" });
                        } }), _jsx("p", { className: "absolute inset-x-0 text-muted-foreground flex-1 text-[18px] font-[500] text-center", children: dateString })] }), _jsxs("div", { className: "flex items-start justify-between", children: [_jsx("div", { children: _jsxs("div", { className: "flex items-center gap-2 p-3 px-2", style: {
                                color: weatherColour(day ? day.code : 0)
                            }, children: [_jsxs("h1", { className: "text-[25px] font-bold", children: [temp ? (temp) : "-", "\u00B0"] }), _jsx("p", { children: "\u2022" }), _jsx("h1", { className: "text-[18px] font-medium", children: weatherLabel(day ? day?.code : 0) })] }) }), _jsx("div", { className: "text-right px-2a", children: _jsx("img", { src: weatherIcon(day ? day.code : 0, day ? is_day : true), className: "w-15 h-15" }) })] })] }));
}
