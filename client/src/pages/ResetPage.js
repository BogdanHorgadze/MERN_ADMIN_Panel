import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'


/* eslint-disable */ const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const ResetPage = () => {
    const history = useHistory()
    const [email,setEmail] = useState('')
    const [message,setMessage] = useState('')

    const emailHandler = async () => {
        if(reg.test(email)){
            const res = await axios.post('/auth/reset',{email})
            setMessage(res.data.message)
            if(res.data.message !== 'нет такого юзера'){
                history.push('/auth')
            }
        }
    }

    return(
        <div className="Reset">
            <div className="container">
                <h1>Reset password</h1>
                <div class="row">
                    <div class="input-field col s12">
                    <input onChange={e => setEmail(e.target.value)} id="email" type="email" class="validate"/>
                    <label for="email">Email</label>
                </div>
                <div style={{marginTop : '10px',marginBottom:'5px'}}>
                 <span>{message}</span>
                </div>
                <button onClick={emailHandler} class="btn waves-effect waves-light" type="submit" name="action">reset
                    <i class="material-icons right">send</i>
                </button>
            </div>
            </div>
        </div>
    )
}

export default ResetPage