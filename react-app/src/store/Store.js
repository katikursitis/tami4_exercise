
import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'
import {userStates } from './InitialStates'

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, {...userStates});
    return (
        <Context.Provider value={[state, dispatch] }>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext([{...userStates}]);
export default Store;