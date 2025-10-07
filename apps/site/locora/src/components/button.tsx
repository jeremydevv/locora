import React from "react";
import Embossed from "./embossed";

interface buttonProps {
    text?: string;
    type?: "default" | "black" | "white";
    shape?: "circle" | "square";
    size?: "small" | "medium" | "large" | "extra-large" | undefined;
    otherProps?: string;
    preChildren?: React.ReactNode;
    children?: React.ReactNode;
    hasBackground?: boolean;
}

export default function BaseButton({
    text,
    shape = "square",
    otherProps,
    children,
    preChildren,
    size = "medium",
    type = "default",
    hasBackground = true,
}: buttonProps) {
    var BaseStyle = "text-white py-2 px-4 rounded-lg drop-shadow-lg font-semibold flex items-center justify-center ";

    var SizeAnimations =
        "hover:scale-105 active:scale-97 transition-transform duration-10 ease-in-out style-smooth ";

    BaseStyle += SizeAnimations;

    if (hasBackground) {
        if (type === "default") {
            BaseStyle += "bg-gradient-to-b from-bay-of-many-700 to-bay-of-many-400 transition-colors ";
        } else if (type === "black") {
            BaseStyle += "bg-gradient-to-b from-gray-900 to-gray-600 transition-colors ";
        } else if (type === "white") {
            BaseStyle += "bg-gradient-to-b from-gray-200 to-gray-50 text-gray-800 transition-colors ";
        }
        BaseStyle += Embossed();
    }

    if (shape === "circle") {
        BaseStyle += "rounded-full ";
    }

    if (otherProps) {
        BaseStyle += otherProps;
    }

    if (size === "small") {
        BaseStyle += "text-sm ";
    } else if (size === "medium") {
        BaseStyle += "text-base ";
    } else if (size === "large") {
        BaseStyle += "text-lg ";
    } else if (size === "extra-large") {
        BaseStyle += "text-xl ";
    }

    return (
        <button className={BaseStyle}>
            {preChildren}
            {text && <p>{text}</p>}
            {children}
        </button>
    );
}
