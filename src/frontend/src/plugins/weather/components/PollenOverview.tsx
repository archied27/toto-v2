import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { DropletIcon, Flower2Icon, FlowerIcon, LeafIcon, SunIcon } from "lucide-react";
import { pollenColour, pollenLabel, uvColour, uvLabel } from "../utils";

export default function PollenOverview({ pollen }: { pollen: number | undefined }) {
    const barWidth = pollen ? `${Math.min(pollen / 150, 1) * 100}%` : 0;
    console.log(pollen)
    return (
        <Card className="border-none shadow-none">
            <CardContent className="px-5 py-4">
                <div className="flex items-center gap-1.5 mb-2.5">
                    <LeafIcon width={16} height={16} color="green" />
                    <CardTitle className="text-xs text-muted-foreground font-medium tracking-wide">
                        Pollen
                    </CardTitle>
                </div>
                <div className="flex items-baseline gap-1.5 mb-2.5">
                    <span className={`text-2xl font-medium leading-none "text-blue-400"`}>
                        {pollen ? pollenLabel(pollen): "-"}
                    </span>
                    </div>
                    <div className="h-1 bg-muted rounded-full">
                    <div
                        className="h-full rounded-full transition-[width] duration-300"
                        style={{ width: barWidth, background: pollen ? pollenColour(pollen) : "yellow"}}
                    />
                </div>
            </CardContent>
        </Card>
    );
}