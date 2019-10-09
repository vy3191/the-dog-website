import {useState, useEffect} from 'react';
import axios from 'axios';


function useDogImages(breed, count) {        
      const [images, setImages] = useState([]);      
      useEffect( () => {
        setImages([]);
        axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${count}`)
            .then(result => {        
              setImages(result.data.message);
            })
            .catch(error => {
              console.log('error:', error)
            })          
      },[breed,count])  
    return [images,setImages];  
}

export default useDogImages;
