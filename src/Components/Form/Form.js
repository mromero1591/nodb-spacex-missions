import React, { Component } from 'react';
import './Form.css';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flightNumberInput: ''
        }
    }

    handleFlightNumberInput = (value) => {
        this.setState({flightNumberInput: value});
    }

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
