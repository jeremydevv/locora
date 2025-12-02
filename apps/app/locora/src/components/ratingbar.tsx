import EmptyStar from "../assets/EmptyStar"
import FilledStar from "../assets/FilledStar"

interface props {
    rating : number,
    style : "white" | "black"
}

export default function RatingBar({rating , style} : props) {

    return (
        <>
            <div
                className="flex flex-row gap-0.5"
            >
                {
                    [1,2,3,4,5].map((starNum) => {
                        return (starNum <= Math.floor(rating)) ? <FilledStar color={style} /> : <EmptyStar color={style} /> 
                    })
                }
            </div>
        </>
    )

}   