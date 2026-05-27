import { type ReactNode } from "react"

interface PageContainerProps {
    children: ReactNode
}

export default function PageContainer({ children }: PageContainerProps)
{
    return (
        <div style={{
            width: '100vw',
            height: '100dvh',
            overflow: 'hidden',
            position: 'relative',
        }}>
            {children}
        </div>
    )
}