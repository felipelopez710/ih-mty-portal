'use client'

import { useState, createContext, useContext } from "react"

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children } : {
    children: React.ReactNode;
}) {
    /* const [activeUser, setActiveUser] = useState({
        user_id: '1',
        user_name: 'Alejandro Gorosabel',
        user_role: 'admin'
    }) */
    const [userContext, setUserContext] = useState(undefined)

    return(
        <AppContext.Provider value={{
            userContext, 
            setUserContext
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    return useContext(AppContext)
}
