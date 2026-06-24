import type { WeatherAtTime } from "../useWeather";
interface PollenGraphProps {
    dayHourlyWeather: WeatherAtTime[] | null;
    currentWeather: WeatherAtTime | null;
}
export default function PollenGraph({ dayHourlyWeather, currentWeather }: PollenGraphProps): import("react/jsx-runtime").JSX.Element;
export {};
