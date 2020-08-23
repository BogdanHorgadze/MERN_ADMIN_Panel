import React, {useState} from 'react'
import axios from 'axios'
import { useHistory,NavLink } from "react-router-dom";
import 'materialize-css'
/* eslint-disable */ const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const AuthPage = () => {
    
    let history = useHistory()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [token,setToken] = useState('')
    const [message,setMessage] = useState('')

    const loginHandler = async () => {
        if(email.length > 5 && password.length > 1){
            const res = await axios.post('/auth/login',{email,password})
            const store = res.data
            setToken(store)
            setMessage(store.message)
            console.log(store)
            localStorage.setItem('login',JSON.stringify(store))
            if(store.token){
                history.push('/users')
            }
        }
        else{
            setMessage('введите корректные данные')
        }
    }

    const registerHandler = async () => {
            if(reg.test(email) && password.length > 1){
                const res = await axios.post('/auth/register',{email,password})
                setMessage(res.data.message)
            }
            else{
                setMessage('введите корректные данные')
            }
    }

    return (
             <div className="auth">
                 <div className="container">
                 <h1>Login</h1>
                <div className="input-field">
                    <input id="email" onChange={(e) => setEmail(e.target.value)}name="email" type="text" className="validate" required/>
                    <label htmlFor="email">email</label>
                    <span className="helper-text" data-error="input email"></span>
                </div>
                <div className="input-field">
                    <input id="password"  onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="validate" required/>
                    <label htmlFor="password">password</label>
                    <span className="helper-text" data-error="input password"></span>
                </div>
                <div>
                <span>{message}</span>
                </div>
                <div style={{marginBottom:'20px'}}><NavLink to="/reset">reset password</NavLink></div>
                <button className="btn waves-effect waves-light" onClick={loginHandler} type="submit">login
                    <i className="material-icons right">login</i>
                </button>
                <button style={{'marginLeft':'10px'}} onClick={registerHandler} className="btn waves-effect waves-light" type="submit">register
                </button>
                </div>
             </div>
    )
}

export default AuthPage