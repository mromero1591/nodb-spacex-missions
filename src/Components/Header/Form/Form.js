import React, { Component } from 'react';
import './Form.css';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flightNumberInput: '',
            showSearch: false,
            searchAllStatus: true
        }
    }

    //Purpose: updated the flight number input as the user makes changes
    //Param: the value of the text input.
    //Returns: None
    //outcome: flight number input state is updated.
    handleFlightNumberInput = (value) => {
        this.setState({
            flightNumberInput: value, 
            showSearch: value.length > 0 ? true : false,
            searchAllStatus: value.length <= 0 ? true : false
        });
    }

    //Purpose: calls the parent continers serach function, that will eventualy make a get request to the space x api.
    //Param: None
    //Returns: None
    //outcome: call is made to the space x api.
    //          input sate is updated to an empty string.
    hangleSearch = () => {
        const flightNumber = this.state.flightNumberInput;
        this.props.runFn(flightNumber);
        this.setState({flightNumberInput: '', showSearch: false});
    }

    //Purpose: calls the parent continers serach all function, that will eventualy make a get request to the space x api.
    //Param: None
    //Returns: None
    //outcome: call is made to the space x api.
    //          input sate is updated to an empty string.
    hangleSearchAll = () => {
        this.props.runSearchAll();
    }
    
    render() {
    return (
      <div className='search-from'>
        <input placeholder='Enter Flight Number...' className='search-box' type='number' value={this.state.flightNumberInput} onChange={ (e) => {this.handleFlightNumberInput(e.target.value)} } />
        {this.state.showSearch &&
            <button onClick={this.hangleSearch} className="btn search-btn">Search</button>
        }
        {this.state.searchAllStatus &&
            <div>
                <p>or</p>
                <button onClick={this.hangleSearchAll} className="btn search-btn">Search All</button>
            </div>
        }
      </div>
    )
  }
}
