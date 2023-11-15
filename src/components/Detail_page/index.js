import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './style.css'; 
import axios from "axios";

const baseUrl = 'https://www.melivecode.com'; 

export default function DetailPage(){ 

    const location = useLocation(); // to get data from parent component
    const navigate = useNavigate(); // to redirect to another component

    const [ locationState, updateLocation] = useState({});

    
    // delete backend api not working
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
            try{
                const response1 = await axios.get(`${baseUrl}/api/attractions/${locationData.id}`) 
                const locationSite = await response1.data.attraction ;
                console.log('Single location: ', response1);
                updateLocation(locationSite) ;
                console.log( locationState); 

            }catch(err){
                console.log('Error while fetching detailed page of location: ', err)
            }
            
        } 
        getLocation();
    },[])



    return(
       
            <div key={locationState.id} className="detail-page">
                <div className="detail-head"> 
                    <div className="back-container">
                        <h1>Detail page</h1> 
                        <button type="button" className="back-button" onClick={()=>{navigate('/list-page')}}>
                            Back
                        </button>
                    </div>
                    
                    <hr/> 
                </div>
                
                <div className="detail-page-list">
                    <h2 className="location-name">{locationState.name}</h2>
                    <img src={locationState.coverimage}  alt={locationState.id} /> 
                    <div className="detail-container">
                        <p className="p-detail">{locationState.detail}</p> 
                        <div className="button-container">
                            <button className="edit-button" type='button'>EDIT</button> 
                            <button className='delete-button' type='button' onClick={deleteLocation}>DELETE</button> 
                        </div>
                    </div>
                    
                </div>
                
            </div>
        
    )
        
    
}