import './style.css'; 
import { Link } from 'react-router-dom';

export default function ListItem(props){ 
    const {locationData} = props; 
    console.log(locationData.id);


    return(
        <div className="item"> 
            <img className='image' src={locationData.coverimage} alt={locationData.id} key={locationData.id}/> 
            <div className='item-details'>
                <h4>{locationData.name}</h4> 
                <p className='detail-para'>{locationData.detail}</p>
               
                <Link to="/detail-page" state={{locationsData: locationData}}>
                     <button className="learn-button" type='submit'>LEARN MORE</button>
                </Link>
            </div>            
        </div>
    )
}