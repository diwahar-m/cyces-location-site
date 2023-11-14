import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './style.css'; 
import axios from "axios";

const baseUrl = 'https://www.melivecode.com'; 

export default function DetailPage(){ 

    const location = useLocation(); // to get data from parent component
    const navigate = useNavigate(); // to redirect to another component

    const [ locationState, updateLocation] = useState([]);

    

    const deleteLocation = async()=>{
        
        try{
            const response = await axios.delete(`${baseUrl}/api/attractions/delete`,{
                id: locationState.id
            }); 
            console.log(response); 
            navigate('/list-page');

        }catch(err){
            console.log('Error while deleting Location: ', err)
        }
    }  

    useEffect(()=>{

        const locationData = location.state.locationsData;
        console.log('LOCATION NAME: ', locationData.name);

        const getLocation = async()=>{
            // get method of single location not working @ the backend
            // const response1 = await axios.get(`${baseUrl}/api/attractions/:${locationData.id}`) 
            // console.log('Getting a single location detail by get method: ', response1);
            // updateLocation(response1) ;
            // console.log( locationState); 

            updateLocation(locationData)
        } 
        getLocation();
    },[])



    return(
       
            <div key={locationState.id} className="detail-page">
                <div className="detail-head"> 
                    <h1>Detail page</h1>
                    <hr/> 
                </div>
                
                <div className="detail-page-list">
                    <h2>{locationState.name}</h2>
                    <img src={locationState.coverimage} alt={locationState.id} /> 
                    <div className="detail-container">
                        <p>{locationState.detail}</p> 
                        <div className="button-container">
                            <button type='button'>EDIT</button> 
                            <button type='button' onClick={deleteLocation}>DELETE</button> 
                        </div>
                    </div>
                    
                </div>
                
            </div>
        
    )
        
    
}