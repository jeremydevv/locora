import { useState } from "react";
import { BusinessPayload } from "../pages/BusinessPage/BusinessStore";

export default function usePageSwitch() {
    
    const [currentPage , setCurrentPage] = useState<1 | 2 | 3 | 4 | 5>(1)
    const [currentData, setCurrentData] = useState<BusinessPayload | null>(null)

    return {
        currentPage,
        setCurrentPage,
        currentData,
        setCurrentData,
    }

}