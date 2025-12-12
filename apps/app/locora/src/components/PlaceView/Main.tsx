import FilledStar from "../../assets/FilledStar"
import placeholder from "../../assets/placeholder.png"
import BaseButton from "../button"
import RatingBar from "../ratingbar"

export default function PlaceView() {

    return (
        <>
            <div
                className="flex flex-col rounded-2xl bg-linear-to-b from-bay-of-many-500 via-bay-of-many-700 to-bay-of-many-600 drop-shadow-9xl shadow-2xl"
            >

                <div
                    className="flex pt-3 pr-3 justify-end"
                >
                    <BaseButton otherProps="flex p-3 aspect-square justify-end" preChildren={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    } />
                </div>

                <div
                    className="flex flex-col p-5"
                >
                    <h1 className="text-white text-left font-bold text-2xl">
                        Place of Establishment
                    </h1>

                    <h2 className="text-white/70 text-left">
                        1234 Average Road Drive
                    </h2>
                </div>

                <div
                    className="w-[20vw] h-[15vh] px-5 rounded-2xl"
                >
                    <img src={placeholder} className="w-full h-full rounded-2xl" />
                </div>

                <div
                    className="flex flex-col items-center pt-2"
                >
                    <RatingBar rating={3.5} style="white" />
                    <p className="text-white font-semibold text-center">
                        3.5/5 rating
                    </p>
                </div>

                <div
                    className="flex flex-row items-center justify-center gap-3 pt-5"
                >
                    <BaseButton otherProps="flex p-1 aspect-square" preChildren={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                        </svg>
                    } />

                    <BaseButton otherProps="flex p-1 aspect-square" preChildren={
                        <FilledStar color="white"/>
                    } />
                </div>

                <div
                    className="flex flex-col gap-2 p-5 pb-5 pt-10"
                >

                    <BaseButton otherProps="flex gap-2" text="Get Directions" type="default" preChildren={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>

                    } />
                    <BaseButton otherProps="flex gap-2" text="More Info" type="black" preChildren={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>

                    } />

                </div>

            </div>
        </>
    )
}