import { useState } from 'react'
import { plugins } from './plugins'
import SwipeNavigator from './components/SwipeNavigator'
import DotsIndicator from './components/DotsIndicator'
import DashboardPage from './dashboard/DashboardPage'

const pages = [
  {"id": "dashboard", "component": DashboardPage},
  ...plugins.map(p => ({ id: p.id, component: p.page }))
]

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isCommandBar, setIsCommandBar] = useState(false)

  return (
    <div className="dark h-screen bg-background pt-[env(safe-area-inset-top)]">
      <SwipeNavigator
        pages={pages}
        currentIndex={currentIndex}
        onPageChange={setCurrentIndex}
      />
      <DotsIndicator currentIndex={currentIndex} total={pages.length} onClick={() => setIsCommandBar(prevIsCommandBar => !prevIsCommandBar)}/>
    </div>
  )
}

export default App
