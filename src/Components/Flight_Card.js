import React from 'react'

export default function FlightCard(props) {
  return (
    <div>
        <h1>{props.flight.missionName}</h1>
        <img className='modal-img' src='https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' alt='flacon 9 in flight' />
        <h4>Rocket: {props.flight.rocket}</h4>
        <p>Flight #: {props.flight.flightNumber}</p>
        <p>Launch Year: {props.flight.launchYear}</p>
        <p>Status: {props.flight.launchSuccess ? 'Sucess' : 'Failure'}</p>
        <button onClick={ () => props.add()}>Add To Collection</button>
        <button>Look for new flight</button>
    </div>
  )
}
