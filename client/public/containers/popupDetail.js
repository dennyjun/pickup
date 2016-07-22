import React, { Component } from 'react';
import Modal from 'react-modal';
import moment from 'moment'

const customStyles = {
  overlay : {
    backgroundColor   : 'rgba(255, 255, 255, .1)',
    zIndex:  900
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class PopupDetail extends Component {
  constructor(props){
    super(props);

    this.state = {
      detailOpen: this.props.detailOpen,
      event: this.props.event || {participants:{}, user:{}}
    };

    this.openDetail = this.openDetail.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      detailOpen: nextProps.detailOpen,
      event: nextProps.event
    });
  }

  openDetail() {
    this.setState({
      detailOpen: true
    });
  }

  closeDetail() {
    this.setState({
      detailOpen: false
    });
  }

  render() {
    return (
        <Modal
          isOpen={this.state.detailOpen}
          onRequestClose={this.closeDetail}
          style={customStyles}>
            <div className="card card-panel hoverable">
              <div className="card-title">
                <h4 className="center-align">
                  {this.state.event.type}
                </h4>
                <p><strong>ID:</strong> {this.state.event.id}</p>
                <p><strong>name:</strong> {this.state.event.user.name}</p>
                <h3>{this.state.event.details}</h3>
                <h5 className="center-align">
                  <strong>{this.state.event.participants.length}</strong>
                  /<strong>{this.state.event.maxParticipants}</strong> players
                </h5>
              </div>
                <h5 className="left-align">
                  <i className="fa fa-globe fa-lg" aria-hidden="true"></i> 
                  &nbsp; &nbsp;{this.state.event.name}
                </h5>
                <h5 className="left-align">
                  <i className="fa fa-calendar" aria-hidden="true"></i> 
                  &nbsp; &nbsp;{moment(this.state.event.time).format('MMMM Do YYYY \n h:mm a')}
                </h5>
                <p><span>posted:</span>{this.state.event.createdAt}</p>
            </div>
        </Modal>
    );
  }
};

export default PopupDetail;