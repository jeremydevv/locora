import SearchResultBox from "./ResultBox"

export default function SearchResults() {
    return (
        <>
            <div
                className="flex flex-col rounded-2xl bg-gradient-to-b from-bay-of-many-500 via-bay-of-many-600 to-bay-of-many-600 drop-shadow-9xl shadow-2xl z-2 p-3 gap-5 overflow-y-scroll max-h-[80vh]"
            >
                {
                    [1,2,3,4,5,6,7].map((id) => {
                        return <SearchResultBox key={id} />
                    })
                }
            </div>
        </>
    )
}