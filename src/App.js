import React, { Component } from 'react';
import './App.css';
import Form from './Components/Form';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: [],
      apiUrl: 'https://api.spacexdata.com/v3/launches'
    }    
  }

  componentDidMount() {
    axios.get('/api/flights').then(res => {
      this.setState({flights: res.data})
    })
  }

  getFlight = (flightId) => {
console.log(flightId);
    axios.get(`${this.state.apiUrl}/${flightId}`)
    .then(res => {
      
    }).catch( error => {
    });
  }
  render() {
    return (
      <div className="">
        <header>
          <div className="site-header">
            <h1 className='site-title'>Find your Fav Flights</h1>
            <Form runFn={this.getFlight}/>
          </div>
        </header>
        <section className='fav-flights-container'>
          { this.state.flights.length === 0 ? (
              <div>Add some Faves</div>
            ) : (
              <div>Faves go here</div>
            )
          }
        </section>
      </div>
    );
  }
}

export default App;
