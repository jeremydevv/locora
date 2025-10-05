import React from "react";
import Embossed from "./embossed";

interface buttonProps {
    text?: string;
    shape: "circle" | "square";
    otherProps?: string;
    preChildren?: React.ReactNode;
    children?: React.ReactNode;
    hasBackground?: boolean;
}

export default function BaseButton({
    text,
    shape,
    otherProps,
    children,
    preChildren,
    hasBackground = true,
}: buttonProps) {
    var BaseStyle =
        "text-white py-2 px-4 rounded-lg drop-shadow-lg font-semibold flex items-center justify-center ";
    var SizeAnimations =
        "hover:scale-105 active:scale-97 transition-transform duration-200 ease-in-out style-smooth ";

    BaseStyle += SizeAnimations;

    if (hasBackground) {
        BaseStyle +=
            "bg-gradient-to-b from-bay-of-many-700 to-bay-of-many-400 transition-colors ";
        BaseStyle += Embossed();
    }

    if (shape === "circle") {
        BaseStyle += "rounded-full ";
    }

    if (otherProps) {
        BaseStyle += otherProps;
    }

    return (
        <button className={BaseStyle}>
            {preChildren}
            {text && <p>{text}</p>}
            {children}
        </button>
    );
}
