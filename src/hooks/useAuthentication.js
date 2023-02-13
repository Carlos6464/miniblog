import {db} from '../firebase/config'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';
import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    
    //limpar a memoria apos o uso da funçãoes
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    //função para verificar memoria
    const checkIfIsCancelled = () => {
        if(cancelled){
            return;
        };
    };

    //função de criar um novo usuario
    const createUser = async (data) => {
        checkIfIsCancelled()
        setLoading(true)

        try{
            //criar um user
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName
            })
            setLoading(false)
            return user;
        } catch(err){
            console.log(err.message)
            console.log(typeof err.message)
            let systemErrorMessage;

            //trantando os erros do sistema
            if (err.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            } else if (err.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
            }

            setError(systemErrorMessage)
            setLoading(false)
        };

        setLoading(false)
    };

    //logout -- deslogar o usuario
    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    };

    //login --realizar login no sistema
    const login = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false)
        } catch (err) {
             let systemErrorMessage;

            //trantando os erros do sistema
            if (err.message.includes("user-not-found")) {
                systemErrorMessage = "Usuario incorreto!";
            } else if (err.message.includes("wrong-password")) {
                systemErrorMessage = "senhas invalida!";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
            }

            setError(systemErrorMessage);
            setLoading(false);
            
        };
        setLoading(false)
    }

    useEffect(() =>{
        return () => setCancelled(true)
    }, []); 

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    };


};