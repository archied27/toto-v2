import type { WeatherAtTime } from "../useWeather";
interface PrecipitationGraphProps {
    dayHourlyWeather: WeatherAtTime[] | null;
    currentWeather: WeatherAtTime | null;
}
export default function PrecipitationGraph({ dayHourlyWeather, currentWeather }: PrecipitationGraphProps): import("react/jsx-runtime").JSX.Element;
export {};
