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
        if(email==='' || password===''){
            updateError('*Please fill all the details'); 
            return ;
        } 
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
        <div className="form-container">
            <form onSubmit={submittingForm}>
                <h1>CRUD OPERATIONS</h1> 
                <h4>SIGN IN</h4> 
                <p className="credential">Enter your credentials to access your account</p>
                <label htmlFor="email">Email</label>
                <input type='email' placeholder="Enter your name" name="email" onChange={changeMail} value={email} /> 
                <label htmlFor="password">Password</label>
                <input type='password' placeholder="Enter your password" name="password" onChange={changePassword} value={password}/> 
                <button className="button"  type='submit' >SIGN IN</button>
                <p className="error">{error}</p>
                <div className="forgot-container">
                    <p class="forgot-password">Forgot your password? </p>
                    <p className="reset-password"> Reset Password</p>
                </div>
                
            </form> 
        </div>


      </div>
    
  ); 

   
}