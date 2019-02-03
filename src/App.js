import React, { Component } from 'react';
import './App.css';
import Form from './Components/Form';
import axios from 'axios';
import FlightModal from './Components/Flight_Modal';
import FlightCard from './Components/Flight_Card';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: [],
      apiUrl: 'https://api.spacexdata.com/v3/launches',
      flightModalStatus: false,
      currentFlight: {}
    }    
  }

  componentDidMount() {
    axios.get('/api/flights').then(res => {
      this.setState({flights: res.data})
    })
  }

  getFlight = (flightId) => {
    axios.get(`${this.state.apiUrl}/${flightId}`)
    .then(res => {
      //grab all the items from the rocket.
      const {flight_number, launch_year, launch_success, mission_name, rocket } = res.data;

      //create a new object of this rocket.
      const newFlight = {
        flightNumber: flight_number,
        launchYear: launch_year,
        launchSuccess: launch_success,
        rocket: rocket.rocket_name,
        missionName: mission_name
      }

      //set this new rocket in state
      this.setState({
        currentFlight: newFlight,
        flightModalStatus: true
      })
    }).catch( error => {
    });
  }

  addNewFlightToCollection = () => {
    //push the new flight to the database.
    axios.post(`/api/flights`, this.state.currentFlight)
    .then( res => {
      this.setState({
        flights: res.data,
        currentFlight: {},
        flightModalStatus: false
      })
    }).catch( error => {
      console.log('faced error');
    })
  }
  render() {
    const flights = this.state.flights.map( (flight) => {
      return (
          <FlightCard key={flight.flightNumber} flight={flight} />
      );
    });
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
              <div>{flights}</div>
            )
          }
        </section>
        
        {this.state.flightModalStatus &&
          <FlightModal flight={this.state.currentFlight} add={this.addNewFlightToCollection} />
        }

      </div>
    );
  }
}

export default App;
