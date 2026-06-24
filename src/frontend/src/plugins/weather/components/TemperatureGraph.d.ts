import type { WeatherAtTime } from "../useWeather";
interface TemperatureGraphProps {
    dayHourlyWeather: WeatherAtTime[] | null;
    currentWeather: WeatherAtTime | null;
}
export default function TemperatureGraph({ dayHourlyWeather, currentWeather }: TemperatureGraphProps): import("react/jsx-runtime").JSX.Element;
export {};
