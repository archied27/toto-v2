import { useNavigation } from "@/hooks/NavigationContext";
import type { PluginManifest } from "../types";
import WeatherPage from "./WeatherPage";
import { pollenColour, weatherColour, weatherIcon } from "./utils";
import { Card } from "@/components/ui/card";

export default {
    id: 'weather',
    label: 'Weather',
    page: WeatherPage,
    widgets: {
        hero: null,
        small: null,
        wide: null
    },
    commandRenderers: {
        show_pollen: ({ data }) => {
            const { pollen } = data;
            return (
                <Card className="border-none shadow-none flex justify-between items-center gap-2 opacity-80">
                    <p className="font-medium text-muted-foreground">The Pollen Is Currently: </p>
                    <p className="font-bold" style={{ color: pollen ? pollenColour(pollen) : undefined }}>
                        {pollen ? pollen.toFixed() : "-"} g/m3
                    </p>
                </Card>
            )
        },

        show_weather: () => {
            const { navigate } = useNavigation();
            navigate("weather", { today: true });
        },

        show_current_weather: ({ data }) => {
            const { temperature, code, is_day } = data;
            return (
                <Card className="border-none shadow-none flex justify-between items-center gap-2 opacity-80">
                    <img src={weatherIcon(code, is_day)} alt="Weather Icon" className="w-10 h-10" />
                    <p className="font-medium text-muted-foreground">The Current Temperature Is:</p>
                    <p className="font-bold" style={{ color: weatherColour(code) }}>
                            {temperature}°C
                    </p>
                </Card>
            )
        }

    }
    
} satisfies PluginManifest