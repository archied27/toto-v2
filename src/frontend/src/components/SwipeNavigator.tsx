import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react'

interface Page {
    id: string
    component: React.ReactNode
}

interface SwipeNavigatorProps {
    pages: Page[]
    currentIndex: number
    onPageChange: (index: number) => void
}

export default function SwipeNavigator({ pages, currentIndex, onPageChange }: SwipeNavigatorProps)
{
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <Swiper
            className="h-screen bg-background pt-[env(safe-area-inset-top)]"
            slidesPerView={1}
            effect="slide"
            watchSlidesProgress
            speed={350}
            spaceBetween={15}
            resistanceRatio={0.85}
            cssMode={false}
            onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex)
                onPageChange(swiper.activeIndex)
            }}>
            {pages.map((page, index) => {
                const isActive = index === activeIndex

                return (
                    <SwiperSlide key={page.id}>
                    <div
                        className={[
                        "h-screen w-screen bg-background transition-all duration-300",
                        isActive ? "p-0" : "p-3"
                        ].join(" ")}
                    >
                        <div
                        className={[
                            "h-full overflow-hidden bg-card",
                            isActive ? "rounded-none": "rounded-3xl",
                            "shadow-[0_0_0_1px_hsl(var(--border))]",
                            "transition-all duration-300",
                            isActive ? "scale-100" : "scale-[0.97]"
                        ].join(" ")}
                        >
                        <div className="h-full overflow-y-auto">
                            {page.component}
                        </div>
                        </div>
                    </div>
                    </SwiperSlide>
                )
                })}
        </Swiper>
    )
}