import { createContext, useState } from "react";


export let SearchContext = createContext()

export default function SearchProvider({children}){
    const [SearchTerm , setSearchTerm] = useState("افلام مصري كومدي")
    const [DataList, setDataList] = useState([]); 


    return(
        <SearchContext.Provider value={{SearchTerm, setSearchTerm, DataList, setDataList}} >
            {children}
        </SearchContext.Provider>  
    )
    
}