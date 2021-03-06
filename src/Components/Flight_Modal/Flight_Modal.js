import React, {Component} from 'react'
import './Flight_Modal.css';

export default class FlightModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentInput: ''
    }
  }


  //Purpose: updated the comment input as the user makes changes
  //Param: the value of the text input.
  //Returns: None
  //outcome: comment input state is updated.
  handleCommentInput = (value) => {
    this.setState({
      commentInput: value
    })
  }

  //Purpose: calls the parent add function
  //Param: none.
  //Returns: None.
  //outcome: the parent add function is called
  //        input text is updated to an empty string
  runAdd = () => {
    this.props.add(this.state.commentInput);
    this.setState({commentInput: ''})
  }

  render(){
    const status = this.props.flight.launchSuccess ? 'success' : 'failure';
    return (
      <div className='modal'>
          <div className="modal-guts">
              <h1 className='mission-name'>{this.props.flight.missionName}</h1>
              {/* <img className='modal-img' src='https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' alt='flacon 9 in flight' /> */}
              <h4 className='modal-item'>
                <strong className='modal-label'>Rocket:</strong> 
                <span className='modal-text-item'> {this.props.flight.rocket}</span>
              </h4>
              <p className='modal-item'>
                <strong className='modal-label'>Flight#:</strong> 
                <span className='modal-text-item'> {this.props.flight.flightNumber}</span>
              </p>
              <p className='modal-item'>
                <strong className='modal-label'>Year:</strong> 
                <span className='modal-text-item'> {this.props.flight.launchYear}</span>
              </p>
              <p className='modal-item'>
                <strong className="modal-label">Status:</strong> 
                <span className={`launch-${status} modal-text-item`}> {status}</span>
              </p>
              <textarea className='modal-comment-area' 
                placeholder='Enter Comment...' 
                value={this.state.commentInput} 
                onChange={ (e) => {this.handleCommentInput(e.target.value)}} />
              <button className='btn modal-btn' onClick={ this.runAdd}>
                <span className='modal-text-item'>Add To Collection</span>
              </button>
              <button className='btn modal-btn' onClick={ () => this.props.cancel()} >
                <span className='modal-text-item'>Look for new flight</span>
              </button>
          </div>
      </div>
    );
  }
}