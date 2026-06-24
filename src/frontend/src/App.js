import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { plugins } from './plugins';
import SwipeNavigator from './components/SwipeNavigator';
import DotsIndicator from './components/DotsIndicator';
import DashboardPage from './dashboard/DashboardPage';
import { WebSocketProvider } from './hooks/WebSocketContext';
import { NavigationProvider, useNavigation } from './hooks/NavigationContext';
import CommandBar from './components/CommandBar';
const pages = [
    { "id": "dashboard", "component": DashboardPage },
    ...plugins.map(p => ({ id: p.id, component: p.page }))
];
const pageIds = pages.map(p => p.id);
function AppInner() {
    const { currentIndex, navigate } = useNavigation();
    const [isCommandBar, setIsCommandBar] = useState(false);
    return (_jsxs("div", { className: "dark h-full bg-background", children: [isCommandBar && _jsx(CommandBar, { onClose: () => setIsCommandBar(false) }), _jsx("div", { className: `h-full transition-all duration-300 ease-in-out 
        ${isCommandBar ? 'blur-sm brightness-50 pointer-events-none select-none' : ''}`, children: _jsx(SwipeNavigator, { pages: pages, currentIndex: currentIndex, onPageChange: (index) => navigate(pageIds[index]) }) }), _jsx(DotsIndicator, { currentIndex: currentIndex, total: pages.length, onClick: () => setIsCommandBar(prev => !prev), isCommandBar: isCommandBar })] }));
}
function App() {
    return (_jsx("div", { className: "dark h-screen bg-background pt-[env(safe-area-inset-top)]", children: _jsx(WebSocketProvider, { url: import.meta.env.VITE_WS_URL, children: _jsx(NavigationProvider, { pageIds: pageIds, children: _jsx(AppInner, {}) }) }) }));
}
export default App;
