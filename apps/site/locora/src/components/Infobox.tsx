import { useRef, useState } from "react";

interface InfoboxProps {
    children?: React.ReactNode,
    title: string,
    info: string,
    size: number,
    onActive: () => void
    onInactive: () => void
    emoji?: string
}
export default function Infobox({ children, title, info, size, onActive, onInactive, emoji }: InfoboxProps) {

    const [showEmoji, setShowEmoji] = useState(false);
    const [corner, setCorner] = useState(0);
    const [rotation, setRotation] = useState(0);

    const cooldown = useRef<boolean>(false);

    const OnActiveMain = () => {
        if (cooldown.current) {
            return;
        }
        cooldown.current = true;

        ShowEmoji();
        onActive();

        setTimeout(() => {
            cooldown.current = false;
        }, 200);
    }

    const OnInactiveMain = () => {
        HideEmoji();
        onInactive();
    }

    const cornerPositions = [
        "top-[-35%] left-[-35%]",
        "top-[-35%] right-[-35%]",
        "bottom-[-35%] left-[-35%]",
        "bottom-[-35%] right-[-35%]",
    ];
    function ShowEmoji() {
        setShowEmoji(true);
        const randomCorner = Math.floor(Math.random() * 4);
        const randomRotation = Math.floor(Math.random() * 80) - 35;
        setCorner(randomCorner);
        setRotation(randomRotation);
    }

    function HideEmoji() {
        setShowEmoji(false);
    }

    return (
        <>
            <div 
                className="relative transition-all aspect-square duration-200 ease-in-out"
                style={{ width: size, height: size }}
            >
                {
                    <span 
                        className={`absolute z-2 ${cornerPositions[corner]} pointer-events-none transition-all duration-150 ease-in-out drop-shadow-xl rounded-lg p-2.5 ${showEmoji ? "scale-100" : "scale-0"}`}
                        style = {{ fontSize: size / 2, rotate: rotation + "deg" }}
                    >

                        {emoji}
                    </span>
                }
                <div
                    onMouseEnter={OnActiveMain}
                    onMouseLeave={OnInactiveMain}
                    className="flex flex-col z-1 w-full h-full justify-between items-center gap-2 bg-bay-of-many-50 drop-shadow-xl border-2 border-bay-of-many-300 rounded-lg p-2.5"
                >
                    <div className="flex flex-row items-center justify-center w-full h-full overflow-clip">
                        <h2 className="text-3xl font-bold text-center">{title}</h2>
                        <p className="text-lg text-center">{info}</p>
                    </div>
                    {children}
                </div>
            </div>

        </>
    )
}