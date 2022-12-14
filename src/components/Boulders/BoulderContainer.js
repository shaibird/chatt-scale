import { useState } from "react"
import { BoulderSearch } from "./BouldersSearch"
import { CragList } from "../Crags/CragList"
//component that maintains the state


export const BoulderContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <BoulderSearch setterFunction={setSearchTerms}/>
        <CragList searchTermState={searchTerms}/>
    </>
                
}