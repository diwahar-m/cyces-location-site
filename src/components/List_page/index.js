import { useEffect, useState } from "react"
import axios from "axios"; 
import ListItem from "../List_item"; 
import './style.css';

export default function ListPage(){

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
        <div className="list-container"> 
            <div className="header"> 
                <h2>TRAVEL APP</h2> 
            </div> 
            <div className='list-items'> 
                <h2 className="head">Around the world</h2> 
                <div className="locations-list">
                    {locations && locations.map( eachLocation =>(
                        <ListItem key={eachLocation.id} locationData={eachLocation}/> 
                       
                    ))}
                </div>
            </div>        
        </div>
    ) 

}