import type { PluginManifest } from "../types";
import TasksPage from "./TasksPage";

export default {
    id: 'tasks',
    label: 'Tasks',
    page: TasksPage,
    widgets: {
        hero: null,
        small: null,
        wide: null
    }
    
} satisfies PluginManifest