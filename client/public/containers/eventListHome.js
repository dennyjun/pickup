import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class EventListHome extends Component {

  renderList() {
    return this.props.getEvents.map((event) => {
      return (
        <div className="card card-panel hoverable" key={event.id}>
          <div className="card-title">
            <h3>Event: {event.type}</h3>
          </div>
            <h3 className="left-align">Players Needed: {event.maxParticipants}</h3>
            <h4 className="center-align">Time: {moment(event.time).format('MMMM Do YYYY, h:mm a')}</h4>
            <h4 className="center-align">Location: {event.name}</h4>
            <p className="card-text">Details: {event.details}</p>
          <div className="card-action">
            <p className="left-align">Host: {event.user.username}</p>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="valign-wrapper">
        <div className="valign center-block">
          {this.renderList()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getEvents: state.getEvents
  };
}

export default connect(mapStateToProps)(EventListHome);