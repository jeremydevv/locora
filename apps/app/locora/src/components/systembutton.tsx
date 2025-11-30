interface Props {
    OnActivate : () => void
    otherProps?: string
    children?: React.ReactNode
}

export default function SystemButton({otherProps,OnActivate, children}: Props) {

    return (
        <>
            <button
                onClick={OnActivate}
                className={`hover:bg-bay-of-many-200 z-2 w-10 h-full p-3 items-center justify-center active:bg-bay-of-many-50 transition-colors duration-50 ease-in-out ` + otherProps}
            >
                {children}
            </button>
        </>
    )

}