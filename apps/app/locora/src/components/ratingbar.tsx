import EmptyStar from "../assets/EmptyStar"
import FilledStar from "../assets/FilledStar"

interface props {
    rating : number,
    style : "white" | "black"
    onRatingClicked? : (rating : 1 | 2 | 3 | 4 | 5) => void
}

export default function RatingBar({rating , style, onRatingClicked} : props) {

    return (
        <>
            <div
                className="flex flex-row gap-0.5"
            >
                {
                    [1,2,3,4,5].map((starNum) => {
                        return (starNum <= Math.floor(rating)) 
                            ? <FilledStar key={starNum} color={style} onClick={() => {
                                if (onRatingClicked) {
                                    onRatingClicked(starNum as 1 | 2 | 3 | 4 | 5)
                                }
                            }} /> 
                            : <EmptyStar key={starNum} color={style} onClick={() => {
                                if (onRatingClicked) {
                                    onRatingClicked(starNum as 1 | 2 | 3 | 4 | 5)
                                }
                            }} /> 
                    })
                }
            </div>
        </>
    )

}   