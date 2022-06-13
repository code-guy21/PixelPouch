import React, {useState} from 'react'
import "./style.css"

function Auth() {
  const [toggle, setToggle] = useState(false)


  return (
    <div className="auth">
      <input placeholder={toggle ? "email" : "email or username"} className='form_input'/>
      <input className={toggle ? "form_input": "hide form_input" } placeholder='username'/>
      <input placeholder='password' className='form_input'/>
      <button id="login" className='submit'>{ toggle ? "signup": "login"}</button>
      <button onClick={() => setToggle(!toggle)}  id="signup" className='submit'>{ toggle ? "login": "signup"}</button>
    </div>
  )
}

export default Auth;