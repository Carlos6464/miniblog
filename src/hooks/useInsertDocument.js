import { useState, useEffect, useReducer } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

//iniciar os estados de loading e do error
const initialState = {
    loading: null,
    error: null
}

//adicionar os estados ao useReducer
const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "INSERTED_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    };
}

//função de inserir a coleção na firebase
export const useInsertDocument = (docCollenction) => {
    //reducer
    const [response, dispatch] = useReducer(insertReducer, initialState);

    //deal with memory leak -- limpar a memoria apos o uso
    const [cancelled, setCancelled] = useState(false);
    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        };
    };

    //função de inserir post no banco de dados
    const insertDocument = async (document) => {
        checkCancelBeforeDispatch({ type: "LOADING" });

        try {
            const newDocument = { ...document, createdAt: Timestamp.now() };
            const insertedDocument = await addDoc(collection(db, docCollenction),
                newDocument);
            checkCancelBeforeDispatch({ type: "INSERTED_DOC", payload: insertedDocument });
        } catch (err) {
            checkCancelBeforeDispatch({ type: "ERROR", payload: err.message });
        };

    };

    useEffect(() => {
    return () => setCancelled(true);
    }, []);

    return {response, insertDocument}

}