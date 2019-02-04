import React, { Component } from 'react';
import './App.css';
import Form from './Components/Form/Form';
import axios from 'axios';
import FlightModal from './Components/Flight_Modal/Flight_Modal';
import FlightContainer from './Components/Flight_Container/Flights_Container'; 
import EditModal from './Components/Edit_Modal/Edit_Modal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: [],
      apiUrl: 'https://api.spacexdata.com/v3/launches',
      flightModalStatus: false,
      editflightModalStatus: false,
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

  addNewFlightToCollection = (comment) => {
    const updatedFlight = {
      ...this.state.currentFlight,
      comment: comment
    }
    //push the new flight to the database.
    axios.post(`/api/flights`, updatedFlight)
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

  removeFlight = (flightId) => {
    axios.delete(`/api/flights/${flightId}`)
        .then(res => {
            this.setState({
              flights: res.data
            })
        }).catch(error => {
            console.log(error);
        })
  }

  newSearch = () => {
    this.setState({flightModalStatus: false});
  }

  showEditFlight = (flight) => {
    this.setState({
      currentFlight: flight,
      editflightModalStatus: true
    })
  }

  closeEdit = () => {
    this.setState({
      editflightModalStatus: false
    })
  }

  editFlight = (flight, updatedComment) => {
    const updatedFlight = {
      ...this.state.currentFlight,
      comment: updatedComment,
    }

    axios.put(`/api/flights/${updatedFlight.flightNumber}`, updatedFlight)
    .then( res => {
      this.setState({
        flights: res.data,
        currentFlight: {},
        editflightModalStatus: false
      })
    }).catch(error => {
      console.log(error.data);
    })
    // axios.put('/api/flights', )  
  }
  render() {
    return (
      <div className="">
        <header>
          <div className="site-header">
            <h1 className='site-title'>Find A SpaceX Flight</h1>
            <Form runFn={this.getFlight}/>
          </div>
        </header>
        <FlightContainer flights={this.state.flights} remove={this.removeFlight} editFlight={this.showEditFlight}/>
        
        {this.state.flightModalStatus &&
          <FlightModal flight={this.state.currentFlight} add={this.addNewFlightToCollection} cancel={this.newSearch} />
        }

        {this.state.editflightModalStatus &&
          <EditModal flight={this.state.currentFlight} edit={this.editFlight} cancel={this.closeEdit} />
        }

      </div>
    );
  }
}

export default App;
