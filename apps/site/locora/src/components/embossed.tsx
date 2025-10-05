import React from "react";

export default function Embossed() {
    const ShadowEffect =
        "shadow-[inset_1.5px_1.5px_4.25px_rgba(255,255,255,0.6),_1.25px_1.25px_0_rgba(50,56,118,0.6),_1.65px_1.65px_3.6px_rgba(50,56,118,0.5)]";

    const HoverShadow =
        "hover:shadow-[inset_1px_1px_3px_rgba(255,255,255,0.5),_2px_2px_0_rgba(50,56,118,0.7),_2.5px_2.5px_4px_rgba(50,56,118,0.6)]";

    const ClickShadow =
        "active:shadow-[inset_0.8px_0.8px_2.5px_rgba(255,255,255,0.55),_1px_1px_0_rgba(50,56,118,0.9),_2px_2px_3px_rgba(50,56,118,0.8)]";

    const transition = "transition-all duration-250 ease-in-out";

    return `${ShadowEffect} ${HoverShadow} ${ClickShadow} ${transition}`;
}