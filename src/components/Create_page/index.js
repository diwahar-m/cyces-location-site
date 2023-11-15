import { useState } from "react";
import axios from "axios";
import './style.css';


export default function CreatePage(){

    // let initialState = {
    //     name: '',
    //     detail: '', 
    //     coverimage: null,
    //     latitude: '',
    //     longitude: ''
    // }

    const [location, updateLocation] = useState({});
    const [error, updateError] = useState('');

    let inputHandler = (event) =>{
        if(event.target.files && event.target.files.length > 0){

            const imageFile = event.target.files[0]  // get meta data of given image
            const eventKey = event.target.id;

            const reader = new FileReader(); // instance object to convert image to url
            reader.onload = function (e){
                const imageUrl = e.target.result; 
                document.getElementById('img1').src= imageUrl
                updateLocation({...location, [eventKey] : imageUrl });

                console.log("Image File:", imageFile);
                console.log("Image URL:", imageUrl);
                console.log("LOCATION: ", location);

            }
            reader.readAsDataURL(imageFile);

        }else{
            updateLocation({...location, [event.target.id] : event.target.value });
            updateError('');
        }
    };

    const submitForm= async(event) =>{
        event.preventDefault(); 

        let isError = false; 
        for(let key in location){
            if(location[key]=== '') isError = true        
        }

        if( isError) {
            updateError('*Please give all the inputs');
            console.log(location)
        }
        else{
            const token = localStorage.getItem('token'); 
            console.log(token); 
            console.log(location);
            await axios.post('/api/auth/attractions/create', location,{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        }
    }

    return(
        <div className='createpage-container'>
                
            <div className="input-image-container">
                <p>Given image :</p>
                <img id='img1' alt='wait' className="input-image" />
            </div>
               
            
            <div className="createpage-form-container">
                <h2 className="location-head">CREATE THE LOCATION</h2> 
                <form onSubmit={submitForm}>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' id='name' onChange={inputHandler}/>

                    <label htmlFor='detail'>Detail:</label>
                    <textarea id="detail" rows="8" cols="170" onChange={inputHandler}></textarea>

                    <label htmlFor='coverimage'>Cover-Image:</label>
                    <input type='file' id='coverimage' accept=".png, .jpeg, .jpg" onChange={inputHandler}/>

                    <label htmlFor='latitude'>latitute:</label>
                    <input type='number' step="0.0000001" id='latitude' onChange={inputHandler}/>

                    <label htmlFor='longitude'>longitude:</label>
                    <input type='number' id='longitude' step="0.0000001" onChange={inputHandler}/> 

                    <p>{error}</p>
                    <div className="create-button-container">
                        <button className="create-button" type='submit'> Create</button>
                    </div>

                </form>
            </div>
            

        </div>


    )
}