import { useState, useEffect } from "react";

export default function IdleClock()
{
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center pt-3 pb-2 -translate-y-20">
                <span className="text-[18px] font-normal text-muted-foreground">
                    {time.toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                    })}
                </span>

                <span className="text-[74px] font-semibold text-primary leading-tight">
                    {time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                </span>

                <div className="flex items-center gap-1.5 text-[18px] font-normal text-muted-foreground mt-0.5">
                    <span className="font-semibold">21°</span>
                    <span>Partly Cloudy</span>
                </div>
            </div>
        </div>
    )
}