import React, { Component } from 'react';
import './Form.css';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flightNumberInput: ''
        }
    }

    //Purpose: updated the flight number input as the user makes changes
    //Param: the value of the text input.
    //Returns: None
    //outcome: flight number input state is updated.
    handleFlightNumberInput = (value) => {
        this.setState({flightNumberInput: value});
    }

    //Purpose: calls the parent continers serach function, that will eventualy make a get request to the space x api.
    //Param: None
    //Returns: None
    //outcome: call is made to the space x api.
    //          input sate is updated to an empty string.
    hangleSearch = () => {
        const flightNumber = this.state.flightNumberInput;
        this.props.runFn(flightNumber);
        this.setState({flightNumberInput: ''});
    }
    
    render() {
    return (
      <div className='search-from'>
        <input placeholder='Enter Flight Number...' className='search-box' type='number' value={this.state.flightNumberInput} onChange={ (e) => {this.handleFlightNumberInput(e.target.value)} } />
        <button onClick={this.hangleSearch} className="btn search-btn">Search</button>
      </div>
    )
  }
}
