import { useState } from "react"

interface props {

}

const SelectionEnum = {
    1 : "Home",
    2 : "Explore",
    3 : "Profile",
}

export default function PageSwitch({} : props) {

    const [curSelection, setSelection] = useState<number>(1)

    return (
        <>
            <div>

                {/*this is the overlay that liquidly moves around to show what page is open*/}
                <div>

                </div>

                {/*this holds all of the section buttons */}
                <div>
                    
                </div>

            </div>
        </>
    )

}