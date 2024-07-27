/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect } from "react";

const initialState = {
    token: localStorage.getItem("token") || null,
    name : localStorage.getItem("name") || null
};

// Create context
export const AuthContext = createContext(initialState);

// Reducer function to handle state changes based on action type
const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("token", action.payload);
            return {
                ...state,
                token: action.payload
            };
        case "LOGOUT":
            localStorage.removeItem("token");
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch({ type: "LOGIN", payload: token });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
