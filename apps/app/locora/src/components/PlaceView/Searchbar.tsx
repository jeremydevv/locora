export default function PlaceSearchBar() {

    return (
        <>
            <div
                className="flex flex-row gap-2"
            >

                {/* search button image */}
                <div
                    className="bg-gradient-to-b p-2 aspect-square from-bay-of-many-600 to-bay-of-many-800 rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth={1} className="size-6">
                        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                    </svg>
                </div>

                {/* search bar text input */}
                <div
                    className="bg-gradient-to-b p-1.5 from-bay-of-many-600 to-bay-of-many-800/80 rounded-full w-[15vw]"
                >
                    <input className="p-2 bg-bay-of-many-950 w-full rounded-full text-white" />
                </div>

            </div>
        </>
    )
}