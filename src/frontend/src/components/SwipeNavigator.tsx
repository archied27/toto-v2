import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper'


interface Page {
    id: string
    component: React.ComponentType
}

interface SwipeNavigatorProps {
    pages: Page[]
    currentIndex: number
    onPageChange: (index: number) => void
}

export default function SwipeNavigator({ pages, currentIndex, onPageChange }: SwipeNavigatorProps)
{
    const [activeIndex, setActiveIndex] = useState(0)

    const swiperRef = useRef<SwiperType | null>(null)

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.activeIndex !== currentIndex) {
            swiperRef.current.slideTo(currentIndex)
        }
    }, [currentIndex])

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
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex)
                onPageChange(swiper.activeIndex)
            }}>
            {pages.map((page, index) => {
                const isActive = index === activeIndex
                const PageComponent = page.component

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
                            "transition-all duration-300",
                            isActive ? "scale-100" : "scale-[0.97]"
                        ].join(" ")}
                        >
                        <div className="h-full overflow-y-auto">
                            <PageComponent />
                        </div>
                        </div>
                    </div>
                    </SwiperSlide>
                )
                })}
        </Swiper>
    )
}