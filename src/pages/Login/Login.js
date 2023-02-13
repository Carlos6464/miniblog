import {useEffect, useState} from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import styles from './Login.module.css'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")


    const { login, error: authError, loading} = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const user = {
          
            email,
            password
        };


        const res = await login(user);
        console.log(res);
    };

    //mapear se o error do hook esta true, caso seja verdade utilizar o setError da pagina de registro para mostar o error
    useEffect(() => {
        if(authError){
            setError(authError)
        }
    },[authError])
  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
        <form onSubmit={handleSubmit}>
          
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
            {!loading && <button  className="btn">Entrar</button> }
            {loading && <button  className="btn" disabled>Aguarde...</button>}
            {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Login
