import { createContext, useContext, useReducer } from "react";
import UfrjpageReducers, { cases, initialState } from "../reducers/ufrj";
import { getUfrjpageInformation } from "../services/ufrjService";

const UfrjpageContext = createContext(initialState);

export const UfrjpageProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UfrjpageReducers, initialState);

    const getUfrjInfo = async () => {
        let response;
        
        await getUfrjpageInformation()
            .then(res => {
                response = res.data.data[0];
            })
            .catch(err => console.error(err));

        dispatch({
            type: cases.GET_UFRJPAGE_INFO,
            payload: {
                info: response
            }
        })
    }

    const value = {
        ...state,
        getUfrjInfo
    }

    return <UfrjpageContext.Provider value={value}>{children}</UfrjpageContext.Provider>
}

const useUfrjpage = () => {
    const context = useContext(UfrjpageContext);

    if (context === undefined) {
        throw new Error("useUfrjpage must be used within UfrjpageContext");
    }

    return context;
};

export default useUfrjpage;