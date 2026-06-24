import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SunIcon } from "lucide-react";
import { uvColour, uvLabel } from "../utils";
import { useNavigation } from "@/hooks/NavigationContext";
export default function UVOverview({ uv_max }) {
    const barWidth = uv_max ? `${Math.min(uv_max / 10, 1) * 100}%` : 0;
    const { navigate } = useNavigation();
    return (_jsx(Card, { className: "border-none shadow-none", onClick: () => (navigate("weather", { scrollTo: "uv" })), children: _jsxs(CardContent, { className: "px-5 py-4", children: [_jsxs("div", { className: "flex items-center gap-1.5 mb-2.5", children: [_jsx(SunIcon, { width: 16, height: 16, color: "orange" }), _jsx(CardTitle, { className: "text-xs text-muted-foreground font-medium tracking-wide", children: "UV Index" })] }), _jsxs("div", { className: "flex items-baseline gap-1.5 mb-2.5", children: [_jsx("span", { className: `text-3xl font-medium leading-none "text-blue-400"`, children: uv_max?.toFixed() }), _jsx("span", { className: "text-xs text-muted-foreground", children: uv_max ? uvLabel(uv_max) : "-" })] }), _jsx("div", { className: "h-1 bg-muted rounded-full", children: _jsx("div", { className: "h-full rounded-full transition-[width] duration-300", style: { width: barWidth, background: uv_max ? uvColour(uv_max) : "yellow" } }) })] }) }));
}
