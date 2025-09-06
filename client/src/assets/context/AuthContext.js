import React, {createContext, useState, useEffect, useContext} from "react";
import { signOut, signInWithEmailAndPassword,onAuthStateChanged, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from '../firebase';

export const AuthContext  = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState();
    const [loading, setLoading] = useState();

    function signup(email,password){
        return createUserWithEmailAndPassword(auth, email,password);
    }

    function login(email,password){
        return signInWithEmailAndPassword(auth, email,password);
    }

    function logout(){
        return signOut(auth);
    }

    function googlesignin(){
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth,googleAuthProvider);
    }

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            setUser(user);
            setLoading(false);
        })

        return () =>{ // ye unmount ke time chalega
            unsub();
        }
    },[])


    const store={ 
        user,
        signup,
        login,
        logout,
        googlesignin
    }
 
    console.log(user+" in authcontext");

    return (
        <AuthContext.Provider value={store}>
            { !loading && children }
        </AuthContext.Provider>
    )

}
