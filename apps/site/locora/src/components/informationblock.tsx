import type React from "react"

interface informationBlockProps {
    header: string
    body: React.ReactNode
    image: string | React.ReactNode
    otherProps?: string
}

export default function InformationBlock({ header, body, image, otherProps }: informationBlockProps) {

    return (
        <>
            <div
                className={`flex bg-bay-of-many-100 rounded-lg p-5 gap-2 items-center ` + otherProps}
            >
                <div>
                    <h1
                        className="font-bold text-bay-of-many-950 text-2xl"
                    >
                        {header}
                    </h1>
                    {body}
                </div>
                <div>
                    {image}
                </div>
            </div>
        </>
    )

}