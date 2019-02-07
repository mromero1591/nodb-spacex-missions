import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Components/Header/Header';
import FlightModal from './Components/Flight_Modal/Flight_Modal';
import FlightContainer from './Components/Flight_Container/Flights_Container'; 
import EditModal from './Components/Edit_Modal/Edit_Modal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: [],
      allFlights: [],
      apiUrl: 'https://api.spacexdata.com/v3/launches',
      flightModalStatus: false,
      editflightModalStatus: false,
      allFlightsModalStatus: false,
      currentFlight: {}
    }    
  }

  //Purpose: When the componenet mounts, grab the flights from the server
  //Param: None
  //Returns: None
  //outcome: flights states is updated to match the server data.
  componentDidMount() {
    //use axios to get the flights from the server.
    axios.get('/api/flights').then(res => {
      this.setState({flights: res.data})
    })
  }

  //Purpose: This will make a call to the sapace x api and return a single mission
  //Param: int - The id of the flight to get
  //Returns: None
  //outcome: the current flight state is updated. And a flight modal come up.
  getFlight = (flightId) => {
    //use a get call to the space x with the given id.
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
      alert('There was a problem with getting the flight');
    });
  }

  searchAllFlights = () => {
    axios.get(`${this.state.apiUrl}`)
    .then(res => {
      this.setState({
        allFlights: res.data,
        allFlightsModalStatus: true
      })
    }).catch( error => {
      console.log('error in getting all flights');
    })
  }

  //Purpose: add the flight from space x to the server.
  //Param: string - the comment to attach to the flight info.
  //Returns: None
  //outcome: server will be updaed with the new flight.
  //        current flight state will be set to empty
  //        flights state will update to include new flight.
  //        flightModalStatus will update to false
  addNewFlightToCollection = (comment) => {
    //create an updatedFlight from the current flight info to contain a comment.
    const updatedFlight = {
      ...this.state.currentFlight,
      comment: comment
    }

    //push the new flight to the database, and update state.
    axios.post(`/api/flights`, updatedFlight)
    .then( res => {
      this.setState({
        flights: res.data,
        currentFlight: {},
        flightModalStatus: false
      })
    }).catch( error => {
      alert('error in adding the new flight');
    })
  }

  //Purpose: remove a given flight from the database.
  //Param: int - the flight id to remove.
  //Returns: None
  //outcome: server will be updated to not include given flight.
  //        flights state will update to match the server.
  removeFlight = (flightId) => {
    //use a delete call to server api.
    axios.delete(`/api/flights/${flightId}`)
        .then(res => {
            this.setState({
              flights: res.data
            })
        }).catch(error => {
            alert('couldnt delete the flight');
        })
  }

  //Purpose: close the flight modal
  //Param: none.
  //Returns: None
  //outcome: the flightmodalstatus will be update to false, and the modal will close.
  newSearch = () => {
    this.setState({flightModalStatus: false});
  }

  //Purpose: bring up the edit flight modal
  //Param: obj - the flight to add to the edit modal
  //Returns: None
  //outcome: current flight state will upadate to the selected flight.
  //        the flight edit modal will appear.
  showEditFlight = (flight) => {
    this.setState({
      currentFlight: flight,
      editflightModalStatus: true
    })
  }

  //Purpose: close the edit modal
  //Param: none.
  //Returns: None
  //outcome: the flight modal will close and state will be update to false.
  closeEdit = () => {
    this.setState({
      editflightModalStatus: false
    })
  }

  //Purpose: update the server with the edited comment
  //Param: obj - the flight to add to the edit modal
  //       string - the updated comment.
  //Returns: None
  //outcome: the flight will be updated with a new comment in the server
  //        current flight state will become an empty obj
  //        edit flight modal will close
  //        flights state will be updated to match the server.
  editFlight = (flight, updatedComment) => {
    //create a new flight object to send to the server.
    const updatedFlight = {
      ...this.state.currentFlight,
      comment: updatedComment,
    }

    //call the put method on the server with the flight id and the updated flight object.
    axios.put(`/api/flights/${updatedFlight.flightNumber}`, updatedFlight)
    .then( res => {
      this.setState({
        flights: res.data,
        currentFlight: {},
        editflightModalStatus: false
      })
    }).catch(error => {
      alert('couldnt update the flight');
    })
  }

  render() {
    return (
      <div className="">
        <Header search={this.getFlight} runSearchAll={this.searchAllFlights}/>

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
