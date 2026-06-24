import type { WeatherAtTime, WeatherDaily } from "../useWeather";
export default function WeatherOverview({ day, current_weather, max_pollen }: {
    day: WeatherDaily | null | undefined;
    current_weather: WeatherAtTime | undefined;
    max_pollen: number;
}): import("react/jsx-runtime").JSX.Element;
