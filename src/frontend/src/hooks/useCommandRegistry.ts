import { useMemo } from "react";
import type { ComponentType } from "react";
import { plugins } from "@/plugins";

export function useCommandRegistry() {
  const registry = useMemo(() => {
    const map: Record<string, ComponentType<{ data: any }>> = {};
    for (const plugin of plugins) {
      for (const [action, renderer] of Object.entries(
        plugin.commandRenderers ?? {}
      )) {
        map[action] = renderer as ComponentType<{ data: any }>;
      }
    }
    return map;
  }, []);

  return registry;
}