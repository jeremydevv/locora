import React from "react";

interface buttonProps {
    text? : string;
    shape : "circle" | "square";
    otherProps?: string;
    children?: React.ReactNode;
    hasBackground?: boolean;
}

export default function BaseButton({ text , shape , otherProps , children, hasBackground = true}: buttonProps) {

    var BaseStyle = "text-white py-2 px-4 rounded-lg drop-shadow-md font-semibold flex items-center justify-center ";
    var SizeAnimations = "hover:scale-105 active:scale-97 transition-transform duration-200 ease-in-out style-smooth ";

    BaseStyle += SizeAnimations;

    if (hasBackground) {
        BaseStyle += "bg-gradient-to-b from-bay-of-many-500 to-bay-of-many-600 transition-colors ";
    }

    if (shape === "circle") {
        BaseStyle += "rounded-full ";
    }

    if (otherProps) {
        BaseStyle += otherProps;
    }

    return (
        <button className={BaseStyle}>
            {text && <p>{text}</p>}
            {children}
        </button>
    )
}
