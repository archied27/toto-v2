import type { WeatherAtTime, WeatherDaily } from "../useWeather";
interface WeatherDaySelectorProps {
    twoWeekOverview: WeatherDaily[] | undefined;
    selectedDay: WeatherDaily | WeatherAtTime | null;
    currentWeather: WeatherAtTime | null;
    onSelectedDay: (day: WeatherDaily | WeatherAtTime | null) => void;
}
export default function WeatherDaySelector({ twoWeekOverview, selectedDay, currentWeather, onSelectedDay }: WeatherDaySelectorProps): import("react/jsx-runtime").JSX.Element;
export {};
