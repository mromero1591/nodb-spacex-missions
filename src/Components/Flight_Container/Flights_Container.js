import React, { Component } from 'react'
import FlightCard from './Flight_Card/Flight_Card';
import './Flight_Container.css';

export default class FlightsContainer extends Component {
    constructor(props) {
        super(props);
    }

    removeFlight = (flightId) => {
        this.props.remove(flightId);
    }

    editFlight = (flight, updatedComment) => {
        this.props.editFlight(flight, updatedComment);
    }

    render() {
        const flights = this.props.flights.map( (flight) => {
            return (
                <FlightCard key={flight.flightNumber} flight={flight} editFlight={this.editFlight} remove={ () => this.removeFlight(flight.flightNumber)}/>
            );
          });
        return (    
            <section>
                { this.props.flights.length === 0 ? (
                    <div className="flight-container-title">Add some Flights</div>
                ) : (
                    <div>
                        <h2 className='flight-container-title'>Flights</h2>
                        <div className="flights-container">
                            {flights}
                        </div> 
                    </div>
                    
                )
                }
            </section>
        )
  }
}
