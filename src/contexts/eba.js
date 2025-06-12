import { createContext, useContext, useReducer } from "react";
import EbapageReducers, { cases, initialState } from "../reducers/eba";
import { getEbapageInformation } from "../services/ebaService";

const EbapageContext = createContext(initialState);

export const EbapageProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EbapageReducers, initialState);

    const getEbaInfo = async () => {
        let response;
        
        await getEbapageInformation()
            .then(res => {
                response = res.data.data[0];
            })
            .catch(err => console.error(err));

        dispatch({
            type: cases.GET_EBAPAGE_INFO,
            payload: {
                info: response
            }
        })
    }

    const value = {
        ...state,
        getEbaInfo
    }

    return <EbapageContext.Provider value={value}>{children}</EbapageContext.Provider>
}

const useEbapage = () => {
    const context = useContext(EbapageContext);

    if (context === undefined) {
        throw new Error("useEbapage must be used within EbapageContext");
    }

    return context;
};

export default useEbapage;