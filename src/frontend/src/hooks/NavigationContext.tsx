import { createContext, useContext, useState, type ReactNode } from 'react'

interface NavigationContextType {
  currentIndex: number
  navigate: (pageId: string, params?: Record<string, unknown>) => void
  params: Record<string, unknown>
  pageIds: string[]
}

const NavigationContext = createContext<NavigationContextType | null>(null)

export function NavigationProvider({ pageIds, children }: { pageIds: string[], children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [params, setParams] = useState<Record<string, unknown>>({})

  const navigate = (pageId: string, params?: Record<string, unknown>) => {
    const index = pageIds.indexOf(pageId)
    if (index !== -1) {
      setParams(params ?? {})
      setCurrentIndex(index)
    }
  }

  return (
    <NavigationContext.Provider value={{ currentIndex, navigate, params, pageIds }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useNavigation must be used within a NavigationProvider')
  return ctx
}