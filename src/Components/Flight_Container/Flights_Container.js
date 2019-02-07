import React from 'react'
import FlightCard from './Flight_Card/Flight_Card';
import './Flight_Container.css';

export default function FlightsContainer(props) {

    const flights = props.flights.map( (flight) => {
            return (
                <FlightCard key={flight.flightNumber} flight={flight} editFlight={ () => props.editFlight(flight)} remove={ () => props.remove(flight.flightNumber)}/>
            );
    });
    return (    
        <section className='flights-container-section'>
            { props.flights.length === 0 ? (
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
