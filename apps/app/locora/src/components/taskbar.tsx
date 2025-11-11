import { ipcRenderer } from "electron";
import LocoraIcon from "../assets/BorderedLocora.png";
import SystemButton from "./systembutton";
import { WindowAction } from "../../types";
import { useEffect, useState } from "react";

import RestoreWindowImage from "../assets/restore.png";

export default function Taskbar() {

    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        const handleMaximize = () => setIsMaximized(true);
        const handleUnmaximize = () => setIsMaximized(false);

        window.electronAPI?.onWindowMaximize(handleMaximize);
        window.electronAPI?.onWindowUnmaximize(handleUnmaximize);

        return () => {
            window.electronAPI?.offWindowMaximize(handleMaximize);
            window.electronAPI?.offWindowUnmaximize(handleUnmaximize);
        };
    }, []);

    const windowAction = (action: WindowAction) => {
        window.electronAPI?.windowAction(action);
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 w-full bg-bay-of-many-900 z-50 justify-between h-9 flex items-center drag-region"
            >

                {/* Title */}
                <div
                    className="flex p-3 gap-3 h-full items-center justify-center"
                >
                    <img src={LocoraIcon} alt="Locora Icon" className="w-5 h-5 select:none" />
                </div>

                <div>
                    <p
                        className="text-sm font-semibold text-white select-none"
                    >
                        Locora
                    </p>
                </div>

                {/* Buttons (min, max, close) */}
                <div
                    className="flex h-full items-center justify-center select-none no-drag"
                >

                    <SystemButton
                        OnActivate={() => windowAction("minimize")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                        </svg>
                    </SystemButton>

                    <SystemButton
                        OnActivate={() => windowAction("maximize")}
                    >
                        {
                            isMaximized ? (
                                <img src={RestoreWindowImage} className="invert w-4 h-4"/>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white">
                                    <rect x="4" y="4" width="16" height="16" strokeWidth={2} rx={2} stroke="white" />
                                </svg>
                            )
                        }
                    </SystemButton>

                    <SystemButton
                        OnActivate={() => windowAction("close")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </SystemButton>

                </div>

            </div>
        </>
    )

}