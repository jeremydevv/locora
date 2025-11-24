import Baseinput from "./baseinput"

interface props {
    id : string,
    fieldLabel : string,
    value : string,
    placeholder : string,
    inputType? : "password" | "email",
    middleware : (text : string) => void
}

export default function InputField({id, fieldLabel , value , placeholder, inputType, middleware} : props) {
    return (
        <>
            <div>
                <p className="text-white">
                    {fieldLabel}
                </p>
                <Baseinput id={id} input={value} placeholder={placeholder} inputType={inputType} OnChange={(msg) => { middleware(msg.target.value) }} />
            </div>
        </>
    )
}