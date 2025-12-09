import RatingBar from "../ratingbar";
import TemplateThumbnail from "../../assets/placeholder.png"

interface props {
}

export default function SearchResultBox({ }: props) {
    return (
        <>
            <div
                className="flex flex-row shadow-amber-50/5 shadow-lg bg-bay-of-many-700 gap-3 w-[22.5vw] min-w-10 p-2 rounded-xl active:scale-97 hover:scale-103 transform transition-all"
            >
                <div
                    className="flex flex-col"
                >

                    <div
                        className="flex flex-col gap-1"
                    >
                        <p
                            className="text-white font-bold"
                        >
                            Name of Location
                        </p>
                        <p
                            className="text-white font-semibold text-sm"
                        >
                            Description of location Description of location Description of location Description of location
                        </p>
                    </div>

                    <div
                        className="flex flex-row gap-2"
                    >
                        <RatingBar style="white" rating={5} />
                        <p
                            className="text-white font-semibold"
                        >
                            5/5
                        </p>
                    </div>

                </div>

                <img src={TemplateThumbnail} className="w-1/2 rounded-xl" />
            </div>
        </>
    )
}