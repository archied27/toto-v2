type DotsIndicatorProps = {
    currentIndex: number;
    total: number;
    onClick?: () => void;
}

export default function DotsIndicator({ currentIndex, total, onClick }: DotsIndicatorProps)
{
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
            <button
                type="button"
                onClick={onClick}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-background/60 backdrop-blur-md border border-border shadow-sm"
            >
                {Array.from({ length: total }).map((_, i) => (
                    <div 
                        key={i}
                        className={["w-2 h-2 rounded-full transition-all duration-200",
                            i === currentIndex
                                ? "bg-primary w-4"
                                : "bg-muted-foreground/60 w-1"
                        ].join(" ")} />
                ))}
            </button>
        </div>
    )
}