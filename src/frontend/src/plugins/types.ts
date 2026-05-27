import type { ComponentType } from 'react'

export interface PluginManifest {
  id: string
  label: string
  page: ComponentType
  widgets: {
    hero: ComponentType | null
    small: ComponentType | null
    wide?: ComponentType | null
  }
}