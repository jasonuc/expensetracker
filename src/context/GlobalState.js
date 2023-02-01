import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from './AppReducer'

const initialState = {
    transactions: []
}

const APP_LOCAL_STORAGE = 'app-local-storage';

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState, () => {
        const localData = localStorage.getItem(APP_LOCAL_STORAGE);
        return localData ? JSON.parse(localData) : initialState;
    });

    useEffect(() => {
        localStorage.setItem(APP_LOCAL_STORAGE, JSON.stringify(state));
    }, [state]);

    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
