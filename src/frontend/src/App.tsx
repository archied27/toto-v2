import { useState } from 'react'
import { plugins } from './plugins'
import SwipeNavigator from './components/SwipeNavigator'
import DotsIndicator from './components/DotsIndicator'
import DashboardPage from './dashboard/DashboardPage'
import { WebSocketProvider } from './hooks/WebSocketContext'
import { NavigationProvider, useNavigation } from './hooks/NavigationContext'

const pages = [
  {"id": "dashboard", "component": DashboardPage},
  ...plugins.map(p => ({ id: p.id, component: p.page }))
]

const pageIds = pages.map(p => p.id)

function AppInner() {
  const { currentIndex, navigate } = useNavigation()
  const [isCommandBar, setIsCommandBar] = useState(false)

  return (
    <div className="dark h-screen bg-background">
      <SwipeNavigator
        pages={pages}
        currentIndex={currentIndex}
        onPageChange={(index) => navigate(pageIds[index])}
      />
      <DotsIndicator currentIndex={currentIndex} total={pages.length} onClick={() => setIsCommandBar(prev => !prev)} />
    </div>
  )
}

function App() {
  return (
    <div className="dark h-screen bg-background pt-[env(safe-area-inset-top)]">
      <WebSocketProvider url={import.meta.env.VITE_WS_URL}>
        <NavigationProvider pageIds={pageIds}>
          <AppInner />
        </NavigationProvider>
      </WebSocketProvider>
    </div>
  )
}

export default App
