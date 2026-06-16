import clear_day from "@meteocons/svg/flat/clear-day.svg";
import clear_night from "@meteocons/svg/flat/clear-night.svg";
import partly_cloudy_day from "@meteocons/svg/flat/partly-cloudy-day.svg";
import partly_cloudy_night from "@meteocons/svg/flat/partly-cloudy-night.svg";
import overcast from "@meteocons/svg/flat/overcast.svg";
import fog from "@meteocons/svg/flat/fog.svg";
import drizzle from "@meteocons/svg/flat/drizzle.svg";
import rain from "@meteocons/svg/flat/rain.svg";
import heavy_rain from "@meteocons/svg/flat/extreme-rain.svg";
import snow from "@meteocons/svg/flat/snow.svg";
import heavy_snow from "@meteocons/svg/flat/extreme-snow.svg";
import sleet from "@meteocons/svg/flat/sleet.svg";
import thunderstorm from "@meteocons/svg/flat/thunderstorms.svg";

const WMO_CODES: Record<number, { label: string; day: string; night: string, colour: string }> = {
  0:  { label: "Clear Sky",       day: clear_day,           night: clear_night,         colour: "#F8AF18" },
  1:  { label: "Mainly Clear",    day: clear_day,           night: clear_night,         colour: "#F8AF18" },
  2:  { label: "Partly Cloudy",   day: partly_cloudy_day,   night: partly_cloudy_night, colour: "#e2e2e2" },
  3:  { label: "Overcast",        day: overcast,            night: overcast,            colour: "#e2e2e2" },
  45: { label: "Fog",             day: fog,                 night: fog,                 colour: "#c5e1e9" },
  48: { label: "Icy Fog",         day: fog,                 night: fog,                 colour: "#c5e1e9" },
  51: { label: "Light Drizzle",   day: drizzle,             night: drizzle,             colour: "#c5e1e9" },
  53: { label: "Drizzle",         day: drizzle,             night: drizzle,             colour: "#c5e1e9" },
  55: { label: "Heavy Drizzle",   day: rain,                night: rain,                colour: "#7C8CA2" },
  61: { label: "Light Rain",      day: rain,                night: rain,                colour: "#7C8CA2" },
  63: { label: "Rain",            day: rain,                night: rain,                colour: "#7C8CA2" },
  65: { label: "Heavy Rain",      day: heavy_rain,          night: heavy_rain,          colour: "#7C8CA2" },
  71: { label: "Light Snow",      day: snow,                night: snow,                colour: "#e2e2e2" },
  73: { label: "Snow",            day: snow,                night: snow,                colour: "#e2e2e2" },
  75: { label: "Heavy Snow",      day: heavy_snow,          night: heavy_snow,          colour: "#e2e2e2" },
  77: { label: "Sleet",           day: sleet,               night: sleet,               colour: "#e2e2e2" },
  80: { label: "Showers",         day: rain,                night: rain,                colour: "#4880d5" },
  81: { label: "Rain Showers",    day: rain,                night: rain,                colour: "#4880d5" },
  82: { label: "Violent Showers", day: heavy_rain,          night: heavy_rain,          colour: "#4880d5" },
  95: { label: "Thunderstorm",    day: thunderstorm,        night: thunderstorm,        colour: "#aa90ed" },
  96: { label: "Thunderstorm",    day: thunderstorm,        night: thunderstorm,        colour: "#aa90ed" },
  99: { label: "Thunderstorm",    day: thunderstorm,        night: thunderstorm,        colour: "#aa90ed" },
};

export function weatherLabel(code: number): string {
  return WMO_CODES[code]?.label ?? "Unknown";
}

export function weatherIcon(code: number, is_day: boolean): string {
  return (is_day ? WMO_CODES[code]?.day : WMO_CODES[code]?.night) ?? clear_day;
}

export function weatherColour(code: number): string {
  return WMO_CODES[code]?.colour ?? "#F8AF18"
}

export function dayLabels(): string[] {
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
}

export function tempColour(temp: number): string {
  if (temp <= 0) return "#60a5fa";
  if (temp <= 10) return "#93c5fd";
  if (temp <= 15) return "#fde68a";
  if (temp <= 20) return "#fbbf24";
  if (temp <= 25) return "#f97316";
  return "#ef4444";
}