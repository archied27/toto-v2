import { useState, useRef } from "react";

interface Page {
    id: string
    component: React.ReactNode
    scrollable: boolean
}

interface SwipeNavigatorProps {
    pages: Page[]
    currentIndex: number
    onPageChange: (index: number) => void
}

export default function SwipeNavigator({ pages, currentIndex, onPageChange }: SwipeNavigatorProps)
{
    
}