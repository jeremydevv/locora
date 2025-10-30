interface inputProps {
    placeholder : string,
    inputType? : "" | "Password"
}

export default function input({placeholder} : inputProps) {

    return (
        <div className="flex rounded-xl bg-bay-of-many-300">
            <input
                className="p-3 text-black w-full h-full"
                placeholder={placeholder}
                type=""
            >
                
            </input>
        </div>
    )

}