import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "@/components/ui/card";
import PrecipitationOverview from "./PrecipitationOverview";
import UVOverview from "./UVOverview";
import PollenOverview from "./PollenOverview";
function isToday(time) {
    if (!time)
        return false;
    const date = new Date(time);
    const today = new Date();
    return (date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate());
}
export default function WeatherOverview({ day, current_weather, max_pollen }) {
    return (_jsxs(Card, { className: "grid grid-cols-3 gap-2 px-3", children: [_jsx(PrecipitationOverview, { precip: day?.precip }), _jsx(UVOverview, { uv_max: isToday(day?.time) ? current_weather?.uv : day?.max_uv }), _jsx(PollenOverview, { pollen: isToday(day?.time) ? current_weather?.grass_pollen : max_pollen })] }));
}
