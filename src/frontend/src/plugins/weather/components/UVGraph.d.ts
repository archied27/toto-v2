import type { WeatherAtTime } from "../useWeather";
interface UVGraphProps {
    dayHourlyWeather: WeatherAtTime[] | null;
    currentWeather: WeatherAtTime | null;
}
export default function UVGraph({ dayHourlyWeather, currentWeather }: UVGraphProps): import("react/jsx-runtime").JSX.Element;
export {};
