/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const initialState = {
    token: sessionStorage.getItem("token")
};

// Create context
export const AuthContext = createContext(initialState);

// Reducer function to handle state changes based on action type
const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            sessionStorage.setItem("token", action.payload);
            return {
                ...state,
                token: action.payload
            };
        case "LOGOUT":
            sessionStorage.removeItem("token");
            return {
                ...state,
                token: null
            };
        default:
            return state;
    }
};

// Context Provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
