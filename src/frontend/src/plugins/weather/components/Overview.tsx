import { Card } from "@/components/ui/card";
import type { WeatherAtTime, WeatherDaily } from "../useWeather";
import PrecipitationOverview from "./PrecipitationOverview";
import UVOverview from "./UVOverview";
import PollenOverview from "./PollenOverview";

function isToday(time: string | undefined | null): boolean {
    if (!time) return false;
    const date = new Date(time);
    const today = new Date();

    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    );
}

export default function WeatherOverview({ day, current_weather, max_pollen }: { day: WeatherDaily | null | undefined, current_weather: WeatherAtTime | undefined, max_pollen: number }) {
    return (
        <Card className="grid grid-cols-3 gap-2 px-3">
            <PrecipitationOverview precip={day?.precip} />
            <UVOverview uv_max={isToday(day?.time) ? current_weather?.uv : day?.max_uv} />
            <PollenOverview pollen={isToday(day?.time) ? current_weather?.grass_pollen : max_pollen} />

        </Card>
    );
}