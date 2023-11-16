import { useEffect, useState } from "react"
import axios from "axios"; 
import ListItem from "../List_item"; 
import './style.css';
import { useNavigate } from "react-router-dom";

export default function ListPage(){

    const navigate = useNavigate();

    const [locations,updateLocations] = useState([]);

    const baseUrl = 'https://www.melivecode.com'; 

    useEffect(()=>{
        const locationData = async()=>{
            try{ 
                const {data} = await axios.get(`${baseUrl}/api/attractions`); 
                updateLocations(data); 
                console.log('Locations: ', locations);

            }catch(err){
                console.log('Error: ', err)
            }
            
        }  
        locationData();
    },[])

    return(
        <div className="list-container container-fluid"> 
            <div className="header w-100 "> 
                <h2 >TRAVEL APP</h2> 
            </div> 
            <div className='list-items '> 
                <div className="list-head w-100  ">
                    <h2 className="head w-50 col-3 ">Around the world</h2> 
                    <button className="col-3 w-25 create-button w-md-100" type='button' onClick={()=>{ navigate('/create-page')}}>Create</button>
                </div>
                
                    <div className="locations-list ">
                        {locations && locations.map( eachLocation =>(
                            
                            <ListItem   locationData={eachLocation}/> 
                        ))}
                    </div>
                
                
            </div>        
        </div>
    ) 

} 

