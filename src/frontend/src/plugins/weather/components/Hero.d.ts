import type { WeatherAtTime, WeatherDaily } from "../useWeather";
export default function Hero({ day, refreshing, setRefreshing }: {
    day: WeatherAtTime | WeatherDaily | null;
    refreshing: boolean;
    setRefreshing: (refreshing: boolean) => void;
}): import("react/jsx-runtime").JSX.Element;
