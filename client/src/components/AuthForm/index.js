import React, {useState} from 'react'
import "./style.css"

function AuthForm() {
  const [toggle, setToggle] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  })

  const handleFormSubmit = () => {
    console.log(formData)
  }

  const handleChange = ({target}) => {
    if(target.name === "option"){
      if(toggle){
        setFormData({...formData, email: target.value})
      }else{
        let regex = new RegExp("^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$");
        if(regex.test(target.value)){
          setFormData({...formData, email: target.value})
        }else{
          setFormData({...formData, username: target.value})
        }
      }
    }else{
      setFormData({...formData, [target.name]: target.value})
    }
   
  }

  return (
    <div className="auth">
      <input id="option" className='form_input' placeholder={toggle ? "email" : "email or username"} name="option" onChange={handleChange} />
      <input className={toggle ? "form_input": "hide form_input" } placeholder='username' name="username" onChange={handleChange} value={formData.username}/>
      <input className='form_input' type="password" placeholder='password' name="password" onChange={handleChange} value={formData.password}/>
      <button id="submit" className='option' onClick={handleFormSubmit}>{ toggle ? "signup": "login"} </button>
      <button id="switch" className='option' onClick={() => {
        setToggle(!toggle);
        setFormData({
          email: "",
          username: "",
          password: ""
        })
        document.getElementById("option").value = "";
       }} >{ toggle ? "login": "signup"}</button>
    </div>
  )
}

export default AuthForm;