import "./App.css";
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()

    // set some initial/default state values
    this.state = {
      breed: 'husky',
      images: []
    }
  }

  componentDidMount() {
    // fetch images for the default state value (husky)
    this.fetchDogImages()
  }

  componentDidUpdate(prevProps, prevState) {
    // this if statement prevents an infinite loop
    // by only re-fetching if the breed has changed since the last update
    //
    // ----- same idea -----
    //   useEffect(() => {
    // 
    //   }, [breed])
    //
    if (prevState.breed !== this.state.breed) {
      // give the user feedback that something is happening
      // by clearing out the current images while fetching new ones
      this.setState({ images: [] })

      // re-fetch images with new state value
      this.fetchDogImages()
    }
  }

  // extract this function from lifecycle event since it's used multiple times
  fetchDogImages = () => {
    axios.get(`https://dog.ceo/api/breed/${this.state.breed}/images`)
      .then(result => {
        this.setState({
          images: result.data.message
        })
      })
      .catch(error => {
        console.log('error:', error)
      })
  }

  // make our select field controlled by react state
  handleChange = (event) => {
    this.setState({
      breed: event.target.value
    })
  }

  render() {
    return (
      <>
        <h1>The Dog Website</h1>

        <select value={this.state.breed} onChange={this.handleChange}>
          <option value="husky">Husky</option>
          <option value="beagle">Beagle</option>
          <option value="corgi">Corgi</option>
          <option value="boxer">Boxer</option>
        </select>

        <div>
          {this.state.images.map((image, index) => (
            <img key={index} src={image} alt="Dog" />
          ))}
        </div>
      </>
    )
  }
}

export default App;
