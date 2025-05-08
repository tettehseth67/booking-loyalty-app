import React, { createContext, useState, useContext } from 'react';

const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
    const [loginVisible, setLoginVisible] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);

    const showLogin = () => {
        setRegisterVisible(false);
        setLoginVisible(true);
    };

    const showRegister = () => {
        setLoginVisible(false);
        setRegisterVisible(true);
    };

    const hideModals = () => {
        setLoginVisible(false);
        setRegisterVisible(false);
    };

    return (
        <AuthModalContext.Provider
            value={{ loginVisible, registerVisible, showLogin, showRegister, hideModals }}
        >
            {children}
        </AuthModalContext.Provider>
    );
};

export const useAuthModals = () => useContext(AuthModalContext);
