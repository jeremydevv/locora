interface inputProps {
    id : string,
    input? : string
    placeholder : string,
    inputType? : "" | "password" | "email"
    OnChange : (e : React.ChangeEvent<HTMLInputElement>) => void
    borderType? : "Red" | "Normal"
    children?: React.ReactNode
}

export default function BaseInput({id , OnChange , placeholder , input , inputType , borderType = "Normal", children} : inputProps) {

    return (
        <div 
            className={`flex opacity-100 border-2 rounded-xl bg-bay-of-many-300`}
            style={{borderColor : borderType === "Red" ? "red" : "blue"}}
        >
            <input
                id={id}
                className="p-3 text-black w-full h-full z-2 bg-bay-of-many-300 rounded-xl focus:outline-none"
                placeholder={placeholder}
                value={input}
                type={inputType || "text"}
                onChange={OnChange}
            >
            </input>
            {children}
        </div>
    )

}