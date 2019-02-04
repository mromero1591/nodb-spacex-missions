import React from 'react';
import './Flight_Card.css';

export default function FlightCard(props) {
  const flightSuccess = props.flight.launchSuccess ? 'success' : 'failure';

  const shortComment = props.flight.comment.length > 20 ? props.flight.comment.slice(0, 20) + '...' : props.flight.comment;
  return (
    <div className='card'>
        <div className="card-guts">
          <h1 className='card-title'>{props.flight.missionName}</h1>
          {/* <img className='modal-img' src={props.rocketImgs} alt='flacon 9 in flight' /> */}
          <h4 className='card-item'>
            <strong className='card-label'>Rocket:</strong> 
            <span className='card-text'>{props.flight.rocket}</span>
          </h4>
          <p className='card-item'>
            <strong className='card-label'>Flight #:</strong> 
            <span className='card-text'>{props.flight.flightNumber}</span>
          </p>
          <p className='card-item'>
            <strong className='card-label'>Year:</strong> 
            <span className='card-text'>{props.flight.launchYear}</span>
          </p>
          <p className='card-item'>
            <strong className='card-label'>Status:</strong>  
            <span className={`launch-${flightSuccess} card-text`} >{flightSuccess}</span>
            </p>
          <p className='card-item card-comment'>
            <strong className='card-label'>Comment: </strong> 
            <span className='card-text'>{shortComment}</span>
          </p>
          <button className='btn card-btn' onClick={ () => props.editFlight(props.flight)}>Edit</button>
          <button className='btn card-btn' onClick={() => props.remove(props.flightNumber)}>Delete</button>
        </div>
    </div>
  )
}
