import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import './style.css';


export default function Login(){
    const [email, updateMail] = useState(''); 
    const [password, updatePassword] = useState('');
    const [error, updateError] = useState('');

    const navigate = useNavigate();

    const baseUrl = 'https://www.melivecode.com';

    const changeMail = event =>{
        updateMail(event.target.value); 
        updateError(''); 
    } 

    const changePassword= event =>{
        updatePassword(event.target.value); 
        updateError(''); 
    }

    const submittingForm = async(event)=>{ 
        event.preventDefault(); 
        try{
            let response = await axios.post(`${baseUrl}/api/login`,{
                "username": email,
                "password": password,
                "expiresIn": 60000
            }); 
            console.log(response)
            if(response.status === 200){
                navigate('/list-page');
            }


        }catch(err){
            if(err.response.status === 401){
                updateError('*Please provide valid credentials'); 
                updateMail(''); 
                updatePassword('');
            }
        }
        
        
        
    
    }

  return (
    
      <div className="login-container">
        <form onSubmit={submittingForm}>
          <h1>CRUD OPERATIONS</h1> 
          <h4>SIGN IN</h4> 
          <p>Enter your credentials to access your account</p>
          <label>Email</label>
          <input type='email' onChange={changeMail} value={email} /> 
          <label>Password</label>
          <input type='password' onChange={changePassword} value={password}/> 
          <button  type='submit' >SIGN IN</button>
          <p className="error">{error}</p>
          <p>Forgot your password? <span> Reset Password</span></p>
        </form> 


      </div>
    
  ); 

   
}