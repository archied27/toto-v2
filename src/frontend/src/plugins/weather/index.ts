import type { PluginManifest } from "../types";
import WeatherPage from "./WeatherPage";

export default {
    id: 'weather',
    label: 'Weather',
    page: WeatherPage,
    widgets: {
        hero: null,
        small: null,
        wide: null
    }
    
} satisfies PluginManifest