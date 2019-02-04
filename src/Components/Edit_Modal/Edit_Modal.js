import React, {Component} from 'react'
import './Edit_Modal.css';

export default class FlightModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentInput: this.props.flight.comment
    }
  }

  handleCommentInput = (value) => {
    this.setState({
      commentInput: value
    })
  }

  runEdit = () => {
    this.props.edit(this.props.flight, this.state.commentInput);
    this.setState({commentInput: ''})
  }

  render(){
    const status = this.props.flight.launchSuccess ? 'success' : 'failure';
    return (
      <div className='modal'>
          <div className="modal-guts">
                <h1 className='mission-name'>
                  {this.props.flight.missionName}
                </h1>
                <h4 className='modal-item'>
                  <strong className='modal-label'>Rocket:</strong> 
                  <span className='modal-text-item'>{this.props.flight.rocket}</span>
                </h4>
                <p className='modal-item'>
                  <strong className='modal-label'>Flight#:</strong> 
                  <span className='modal-text-item'>{this.props.flight.flightNumber}</span>
                </p>
                <p className='modal-item'>
                  <strong className='modal-label'>Year:</strong> 
                  <span className='modal-text-item'>{this.props.flight.launchYear}</span>
                </p>
                <p className='modal-item'>
                  <strong className="modal-label">Status:</strong> 
                  <span className={`launch-${status} modal-text-item`}>{status}</span>
                </p>
                <textarea className='modal-comment-area' 
                    placeholder='Enter Comment...' 
                    value={this.state.commentInput} 
                    onChange={ (e) => {this.handleCommentInput(e.target.value)}} />
                <button className='modal-btn' onClick={this.runEdit}>
                  <span className='modal-text-item'>Update Flight</span>
                </button>
                <button className='modal-btn' onClick={ () => this.props.cancel()} >
                    <span className='modal-text-item'>Cancel</span>
                </button>
          </div>
      </div>
    );
  }
}