export default function StatusBar()
{
    return (
        <div className="flex flex-col items-center pt-3 pb-2">
            <span className="text-[15px] font-normal text-muted-foreground">Tuesday · 19 May</span>
            <span className="text-[38px] font-semibold text-primary leading-tight">9:24</span>
            <div className="flex items-center gap-1.5 text-[15px] font-normal text-muted-foreground mt-0.5">
                <span className="font-semibold">21°</span>
                <span>Partly Cloudy</span>
            </div>
        </div>
    )
}