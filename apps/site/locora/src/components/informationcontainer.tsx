import React from "react"

interface informationContainerProps {
    children?: React.ReactNode
    otherProps? : string
}

export default function InformationContainer({children , otherProps} : informationContainerProps) {

    const [currentModule, setCurrentModule] = React.useState(0);
    const [currentTiming, setCurrentTiming] = React.useState(0);

    return (
        <>
            <div
                className={`rounded-lg p-5 gap-2 items-center ` + otherProps}
            >{children}</div>
        </>
    )
}