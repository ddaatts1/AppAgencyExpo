import {createContext, useContext, useState} from "react";


const FutureLangContext = createContext();

export function FutureLangProvider({ children }) {
    const [futureLang, setFutureLang] = useState(true);
    const [takeCarePopup,setTakeCarePopup]  = useState(true)
    const [potentialPopup,setPotentialPopup]  = useState(true)

    return (
        <FutureLangContext.Provider value={{ futureLang,
            setFutureLang,
            takeCarePopup,
            setTakeCarePopup,
            potentialPopup,
            setPotentialPopup
        }}>
            {children}
        </FutureLangContext.Provider>
    );
}

export function useFutureLang() {
    return useContext(FutureLangContext);
}
