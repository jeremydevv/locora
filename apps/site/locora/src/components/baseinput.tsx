interface inputProps {
    id : string,
    placeholder : string,
    inputType? : "" | "password" | "email"
}

export default function BaseInput({id , placeholder , inputType} : inputProps) {

    return (
        <div className="flex rounded-xl cursor-text bg-bay-of-many-300">
            <input
                id={id}
                className="p-3 text-black w-full h-full z-2"
                placeholder={placeholder}
                type={inputType || "text"}
            >
                
            </input>
        </div>
    )

}