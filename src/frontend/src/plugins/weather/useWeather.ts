import { useState, useEffect, useCallback } from "react";
import { useWebSocketContext } from "@/hooks/WebSocketContext";
import { apiFetch } from "@/hooks/api";


export interface WeatherAtTime {
  time: string;
  temp: number;
  precip_mm: number;
  precip_prob: number;
  uv: number;
  code: number;
  is_day: boolean;
}

export interface WeatherDaily {
  time: string;
  max_temp: number;
  min_temp: number;
  avg_temp: number;
  code: number;
}

export interface WeatherData {
  current_weather: WeatherAtTime;
  two_week_overview: WeatherDaily[];
  two_week_hourly: WeatherAtTime[];
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { useEvent } = useWebSocketContext();

  useEffect(() => {
    apiFetch<WeatherData>("/weather/current")
        .then(data =>  {
            setWeather(data);
            console.log(data)
            setLoading(false);
        })
        .catch(() => {
            setError(true);
            setLoading(false);
        })
  }, []);

  const handleUpdate = useCallback((data: unknown) => {
    console.log("updated")
    setWeather(data as WeatherData);
  }, []);

  useEvent("weather.updated", handleUpdate);

  return { weather, loading, error };
}