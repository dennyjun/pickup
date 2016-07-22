import React, { Component } from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import { submitPlayer } from '../actions/index';
import moment from 'moment';

class SearchHome extends Component {
  constructor(props) {
    super(props)
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  };

  joinEvent(event) {
    this.props.submitPlayer(event.id);
  }

  displayParticipants(participants) {
    return participants.map((participant, index) => {
      return (
        <li key={index} data-id={participant.id}>
          {participant.username}
        </li>
      );
    })
  }

  renderJoinEventButton(event) {
    if(event.maxParticipants < 1) {
      return;
    }
    // NEED USER ID TO FILTER
    // for(let i = 0; i < event.participants.length; ++i) {
    //   if(needimplemented.user.id === event.user.id) {
    //     return;
    //   }
    // }
    return(
      <div className="card-action">
        <button className="btn red waves-effect waves-light" 
                onClick={(event) => this.joinEvent(event)} 
                type="button" 
                name="action"> 
          <i className="material-icons right" />
          Join
        </button>
      </div>
    );
  }

  searchedEventCards() {
    return this.props.searchEvents.map((event, index) => {
      return(
        <div className="valign-wrapper" data-id={event.id} key={index}>
          <div className="valign center-block">
            <div className="card card-panel hoverable">
              <div className="card-title">
              <p><strong>ID: </strong>{String.fromCharCode(event.id + 64)}</p>
                <h4 className="center-align">
                  {event.type}
                </h4>
              </div>
                <h5 className="left-align">
                  <i className="fa fa-globe fa-lg" aria-hidden="true"></i> 
                  &nbsp; &nbsp;{event.name}
                </h5>
                <h5 className="left-align">
                  <i className="fa fa-calendar" aria-hidden="true"></i> 
                  &nbsp; &nbsp;{moment(event.time).format('MMMM Do YYYY \n h:mm a')}
                </h5>
                <h5 className="center-align">
                  waiting for <strong>{event.maxParticipants}</strong> more
                </h5>
                <h5 className="card-text center-align"><strong>Details:</strong> {event.details}</h5>
                {this.renderJoinEventButton(event)}
                <p className="left-align">
                  <i className="fa fa-star" aria-hidden="true"></i> 
                  &nbsp; &nbsp;<span data-id={event.user.id}>{event.user.username}</span>
                </p>
                <ul>
                  <i className="fa fa-users fa-lg" aria-hidden="true"></i> 
                  {this.displayParticipants(event.participants)}
                </ul>
            </div>
          </div>                    
        </div>
      )
    })
  }

   eventMarkers() {
    return this.props.searchEvents.map((event, index) => {
      return(
        <Marker
          key={index}
          lat={event.location.lat}
          lng={event.location.lng}
          label={String.fromCharCode(event.id + 64)}
          draggable={false}
          onDragEnd={this.onDragEnd} />
      )
    })
  }

  render() {
    return (
      <div>

      <div id="eventsView">
        {this.searchedEventCards()}
      </div>
    
        <div id='map'>
          <Gmaps
            width={'100%'}
            height={'100%'}
            lat={this.props.determinedLocation.lat || 34.024212}
            lng={this.props.determinedLocation.lng || -118.496475}
            zoom={13}
            loadingMessage={'Be happy'}
            params={{v: '3.exp', key: 'AIzaSyAlCGs74Skpymw9LLAjkMg-8jQ1gIue9n8'}}
            onMapCreated={this.onMapCreated}>
            <Marker
              lat={this.props.determinedLocation.lat}
              lng={this.props.determinedLocation.lng}
              label={'x'}
              draggable={false}
              onDragEnd={this.onDragEnd} />
            { this.eventMarkers() }
          </Gmaps>
        </div>


      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    searchEvents: state.searchEvents,
    determinedLocation: state.determinedLocation
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ submitPlayer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchHome)

