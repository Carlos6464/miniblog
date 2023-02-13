import {useEffect, useState} from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

import styles from './Register.module.css'

const Register = () => {
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")


    const { createUser, error: authError, loading} = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const user = {
            displayName,
            email,
            password
        };

        if(password !== ConfirmPassword){
            setError("As senhas precisam ser iguais!")
            return
        };

        const res = await createUser(user);
        console.log(res);
    };

    //mapear se o error do hook esta true, caso seja verdade utilizar o setError da pagina de registro para mostar o error
    useEffect(() => {
        if(authError){
            setError(authError)
        }
    },[authError])
  return (
    <div  className={styles.register}>
        <h1>Cadastra-se para postar!</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome:</span>
                <input 
                    type="text"
                    name='displayName'
                    placeholder='nome do usuario'
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)} 
                />
            </label>

            <label>
                <span>Email:</span>
                <input 
                    type="email"
                    name='email'
                    placeholder='email do usuario'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </label>

             <label>
                <span>Senha:</span>
                <input 
                    type="password"
                    name='password'
                    placeholder='Insira a senha'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </label>

            <label>
                <span>Confirmação de Senha:</span>
                <input 
                    type="password"
                    name='ConfirmPassword'
                    placeholder='confirme a senha'
                    required
                    value={ConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
            </label>

            {!loading && <button  className="btn">Cadastrar</button> }
            {loading && <button  className="btn" disabled>Aguarde...</button>}
            {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Register;