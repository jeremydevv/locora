interface props {
    isActivated : boolean
    OnActivated : () => void,
    OnHover : () => void,
    OnUnHover : () => void
    image : string
}

export default function({image , OnActivated, OnHover, OnUnHover} : props) {

    return (
        <>
            <div
                onClick={OnActivated}
                onMouseEnter={OnHover}
                onMouseLeave={OnUnHover}
                className="w-8 h-8 p-2 items-center justify-center"
            >
                <img src={image} className="w-full h-full"/>
            </div>
        </>
    )

}