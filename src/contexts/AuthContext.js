import React, {useContext, useState, useEffect} from 'react'
import { auth } from "../firebase/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState()

    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(email, password){
        return signOut(auth, email, password)
    }

    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user)
        })

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={ value }>
            {children}
        </AuthContext.Provider>
    )
}