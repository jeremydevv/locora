interface inputProps {
    id : string,
    placeholder : string,
    inputType? : "" | "password" | "email"
}

export default function BaseInput({id , placeholder , inputType} : inputProps) {

    return (
        <div className="flex opacity-100 border-2 border-bay-of-many-600 rounded-xl bg-bay-of-many-300">
            <input
                id={id}
                className="p-3 text-black w-full h-full z-2 bg-bay-of-many-300 rounded-xl focus:outline-none"
                placeholder={placeholder}
                type={inputType || "text"}
            >
                
            </input>
        </div>
    )

}