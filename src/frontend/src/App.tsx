import { useState } from 'react'
import PageContainer from './components/PageContainer'
import SwipeNavigator from './components/SwipeNavigator'

const testPages = [
  {
    id: 'dashboard',
    scrollable: false,
    component: (
      <div style={{ 
        height: '100%', 
        background: '#1a1a2e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px'
      }}>
        Dashboard (no scroll)
      </div>
    )
  },
  {
    id: 'tasks',
    scrollable: true,
    component: (
      <div style={{ background: '#16213e', color: 'white', padding: '24px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Tasks (scrollable)</h1>
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} style={{ 
            padding: '16px', 
            marginBottom: '8px', 
            background: '#0f3460',
            borderRadius: '8px'
          }}>
            Task item {i + 1}
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'spotify',
    scrollable: true,
    component: (
      <div style={{ 
        height: '200%',  // deliberately tall to test scroll
        background: '#0d7377',
        color: 'white',
        padding: '24px'
      }}>
        <h1>Spotify (scrollable)</h1>
        <p>This page is very tall. You should be able to scroll down.</p>
      </div>
    )
  },
]

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <PageContainer>
      <SwipeNavigator
        pages={testPages}
        currentIndex={currentIndex}
        onPageChange={setCurrentIndex}
      />
      
    </PageContainer>
  )
}

export default App
