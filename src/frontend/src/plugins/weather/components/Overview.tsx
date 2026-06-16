import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { WeatherAtTime, WeatherDaily } from "../useWeather";
import { DropletIcon } from "lucide-react";
import PrecipitationOverview from "./PrecipitationOverview";
import UVOverview from "./UVOverview";

export default function WeatherOverview({ day }: { day: WeatherDaily | null | undefined}) {
    return (
        <Card className="grid grid-cols-3 gap-2 px-3">
            <PrecipitationOverview precip={day?.precip} />
            <UVOverview uv_max={day?.max_uv} />
            
        </Card>
    );
}