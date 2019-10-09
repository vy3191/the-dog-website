import "./App.css";
import React, { useState, useEffect } from 'react';
import {useLocalStorage} from './utils/input';
import useDogImages from './utils/api';

function App()  {
  
    // set some initial/default state values
    const [breed, setBreed] = useLocalStorage('breed', 'husky');   
    const [count, setCount] = useLocalStorage('count', 1);
    const [images] = useDogImages(breed, count);  

  return (
      <>
        <h1>The Dog Website</h1>
        <select value={breed} onChange={(e) => setBreed(e.target.value)}>
          <option value="husky">Husky</option>
          <option value="beagle">Beagle</option>
          <option value="corgi">Corgi</option>
          <option value="boxer">Boxer</option>
        </select>
        <input type="number" onChange={(e) => setCount(e.target.value)} value={count} placeholder="image count" />
        <div>
          {images.map((image, index) => (
            <img key={index} src={image} alt="Dog" />
          ))}
        </div>
      </>
    )
  }


export default App;
