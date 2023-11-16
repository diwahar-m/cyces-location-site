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
    
      <div className="container-fluid">
        <div className="row login-container">
        <div className="col-10 col-sm-8 col-md-6 col-lg-5 form-container">
            <form onSubmit={submittingForm}>
                <h1 className="w-100 w-md-50">CRUD OPERATIONS</h1> 
                <h4 className="w-100 w-md-25 sign-in">SIGN IN</h4> 
                <p className="credential w-md-50">Enter your credentials to access your account</p>
                
                <label className="w-md-100"  htmlFor="email">Email</label>
                <input className="mb-3 mb-md-4 " type='email' placeholder="Enter your name" name="email" onChange={changeMail} value={email} /> 
                <label htmlFor="password">Password</label>
                <input type='password' placeholder="Enter your password" name="password" onChange={changePassword} value={password}/> 
                <button className="button mb-2"  type='submit' >SIGN IN</button>
                <p className="error">{error}</p>
                <div className="forgot-container d-md-flex">
                    <p class="forgot-password w-100 w-md-50 text-center">Forgot your password? </p>
                    <p className="reset-password w-100 text-center"> Reset Password</p>
                </div>
                
            </form> 
        </div>


        </div>


       
      </div>
    
  ); 

   
}