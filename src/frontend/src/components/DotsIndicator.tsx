type DotsIndicatorProps = {
    currentIndex: number;
    total: number;
    onClick?: () => void;
    isCommandBar?: boolean;
}

export default function DotsIndicator({ currentIndex, total, onClick, isCommandBar }: DotsIndicatorProps)
{
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
            <button
                type="button"
                onClick={onClick}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-background/60 backdrop-blur-md border border-border shadow-sm transition-all duration-500 ease-in-out"
                style={{
                    height: '2rem',
                    padding: isCommandBar ? '0 0.625rem' : '0 0.75rem',
                    gap: isCommandBar ? '0' : '6px',
                }}
            >
                {isCommandBar ? 
                (
                <div>
                <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="text-foreground/70"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                    >
                        <line x1="2" y1="2" x2="12" y2="12" />
                        <line x1="12" y1="2" x2="2" y2="12" />
                    </svg>
                </div>)
                : (Array.from({ length: total }).map((_, i) => (
                    <div 
                        key={i}
                        className={["w-2 h-2 rounded-full transition-all duration-200",
                            i === currentIndex
                                ? "bg-primary w-4"
                                : "bg-muted-foreground/60 w-1"
                        ].join(" ")} />
                )))}
                
            </button>
        </div>
    )
}