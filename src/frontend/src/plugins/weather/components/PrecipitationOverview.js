import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useNavigation } from "@/hooks/NavigationContext";
import { DropletIcon } from "lucide-react";
export default function PrecipitationOverview({ precip }) {
    const barWidth = precip ? `${Math.min(precip / 15, 1) * 100}%` : 0;
    const { navigate } = useNavigation();
    return (_jsx(Card, { onClick: () => (navigate("weather", { scrollTo: "precipitation" })), children: _jsxs(CardContent, { className: "px-1 py-4", children: [_jsxs("div", { className: "flex items-center gap-1.5 mb-2.5", children: [_jsx(DropletIcon, { size: 16, className: "shrink-0 text-blue-400" }), _jsx(CardTitle, { className: "text-xs text-muted-foreground font-medium tracking-wide whitespace-normal", children: "Precipitation" })] }), _jsxs("div", { className: "flex items-baseline gap-1.5 mb-2.5 pt-4 w-3/4 mx-auto", children: [_jsx("span", { className: `text-3xl font-medium leading-none "text-blue-400"`, children: precip }), _jsx("span", { className: "text-xs text-muted-foreground", children: "mm" })] }), _jsx("div", { className: "h-1 bg-muted rounded-full w-3/4 mx-auto", children: _jsx("div", { className: "h-full bg-blue-400 rounded-full transition-[width] duration-300", style: { width: barWidth } }) })] }) }));
}
