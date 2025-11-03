interface props {
    isActivated? : boolean
    OnActivated? : () => void,
    OnHover? : () => void,
    OnUnHover? : () => void
    Effects? : string
    image : string
}

export default function({image , OnActivated, OnHover, OnUnHover, Effects} : props) {

    return (
        <>
            <div
                onClick={OnActivated}
                onMouseEnter={OnHover}
                onMouseLeave={OnUnHover}
                className={`w-8 h-8 p-[5px] items-center justify-center select-none  ${Effects}`}
            >
                <img src={image} className="w-full h-full"/>
            </div>
        </>
    )

}