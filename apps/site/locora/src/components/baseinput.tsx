interface inputProps {
    placeholder : string,
    inputType? : "" | "Password"
}

export default function BaseInput({placeholder} : inputProps) {

    return (
        <div className="flex rounded-xl cursor-text bg-bay-of-many-300">
            <input
                className="p-3 text-black w-full h-full"
                placeholder={placeholder}
                type=""
            >
                
            </input>
        </div>
    )

}