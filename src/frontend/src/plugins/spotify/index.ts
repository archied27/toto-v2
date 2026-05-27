import type { PluginManifest } from "../types";
import SpotifyPage from "./SpotifyPage";

export default {
    id: 'spotify',
    label: 'Spotify',
    page: SpotifyPage,
    widgets: {
        hero: null,
        small: null,
        wide: null
    }
    
} satisfies PluginManifest