import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { LeafIcon } from "lucide-react";
import { pollenColour, pollenLabel } from "../utils";
import { useNavigation } from "@/hooks/NavigationContext";
export default function PollenOverview({ pollen }) {
    const barWidth = pollen ? `${Math.min(pollen / 140, 1) * 100}%` : 0;
    const { navigate } = useNavigation();
    return (_jsx(Card, { className: "border-none shadow-none", onClick: () => (navigate("weather", { scrollTo: "pollen" })), children: _jsxs(CardContent, { className: "px-5 py-4", children: [_jsxs("div", { className: "flex items-center gap-1.5 mb-2.5", children: [_jsx(LeafIcon, { width: 16, height: 16, color: "green" }), _jsx(CardTitle, { className: "text-xs text-muted-foreground font-medium tracking-wide", children: "Pollen" })] }), _jsx("div", { className: "flex items-baseline gap-1.5", children: _jsx("span", { className: `text-2xl font-medium leading-none "text-blue-400"`, children: pollen ? pollenLabel(pollen) : "-" }) }), _jsxs("span", { className: "text-xs text-muted-foreground", children: [pollen ? pollen.toFixed() : "-", " ", _jsx("span", { className: "text-[10px]", children: "g/m3" })] }), _jsx("div", { className: "h-1 bg-muted rounded-full mt-2.5", children: _jsx("div", { className: "h-full rounded-full transition-[width] duration-300", style: { width: barWidth, background: pollen ? pollenColour(pollen) : "yellow" } }) })] }) }));
}
