import React from "react";
import Embossed from "./embossed";

import loading from "../assets/loading.png"

interface buttonProps {
    text?: string;
    type?: "default" | "black" | "white";
    shape?: "circle" | "square";
    size?: "xs" | "small" | "medium" | "large" | "extra-large" | undefined;
    otherProps?: string;
    preChildren?: React.ReactNode;
    children?: React.ReactNode;
    hasBackground?: boolean;
    CurrentlyYielding? : boolean,
    onClick?: (...args : any) => void;
}

const sizesToText = {
    ["xs"]: "text-xs",
    ["small"]: "text-sm",
    ["medium"]: "text-base",
    ["large"]: "text-lg",
    ["extra-large"]: "text-xl",
}

export default function BaseButton({
    text,
    shape = "square",
    otherProps,
    children,
    preChildren,
    size = "medium",
    type = "default",
    CurrentlyYielding = false,
    hasBackground = true,
    onClick = () => {},
}: buttonProps) {
    var BaseStyle = "text-white py-2 cursor-pointer px-3 rounded-lg drop-shadow-lg font-semibold flex items-center justify-center ";

    var SizeAnimations =
        "hover:scale-105 active:scale-97 transition-transform duration-10 ease-in-out style-smooth ";

    BaseStyle += SizeAnimations;

    if (hasBackground) {
        if (type === "default") {
            BaseStyle += "bg-gradient-to-b from-blue-700 to-bay-of-many-500 transition-colors ";
        } else if (type === "black") {
            BaseStyle += "bg-gradient-to-b from-gray-900 to-gray-600 transition-colors ";
        } else if (type === "white") {
            BaseStyle += "bg-gradient-to-b from-gray-200 to-gray-200/85 text-gray-800 transition-colors ";
        }
        BaseStyle += Embossed();
    }

    if (shape === "circle") {
        BaseStyle += "rounded-full ";
    }

    if (otherProps) {
        BaseStyle += otherProps;
    }

    if (size) {
        BaseStyle += " " + sizesToText[size];
    }

    return (
        <button className={BaseStyle} onClick={onClick} disabled={CurrentlyYielding}>
            {preChildren}
            {!CurrentlyYielding && text && <p>{text}</p>}
            {CurrentlyYielding && 
                <img src={loading} alt="Loading" className="w-6 h-6 animate-spin"/>
            }
            {children}
        </button>
    );
}
