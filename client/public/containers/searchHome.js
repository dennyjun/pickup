import React, { Component } from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import { submitPlayer } from '../actions/index';
import moment from 'moment';
import PopupDetail from './popupDetail.js';

let imgs = (() => {
  return {
    baseball: 'baseball.png',
    basketball: 'basketball.png',
    billiard: 'billiard.png',
    cricket: 'cricket.png',
    football: 'football.png',
    golf: 'golf.png',
    handball: 'handball.png',
    rugby: 'rugby.png',
    soccer: 'soccer.png',
    squash: 'squash.png',
    tabletennis: 'tabletennis.png',
    tennis: 'tennis.png',
    volleyball: 'volleyball.png'
  };
})();

class SearchHome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      detailOpen: false,
      newPlayerName: '',
      openEvent: undefined
    }
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
    return this.props.searchEvents.map((event) => {
      return(
        <div className="valign-wrapper">
          <div className="valign center-block" onClick={this.detailOpen.bind(this, event)}>
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
            </div>
          </div>
        </div>
      )
    })
  }

  detailOpen(event) {      
    console.log("EVNET",event)
    this.setState({
      detailOpen: true,
      openEvent: event
    });
  }

  eventMarkers() {
    return this.props.searchEvents.map((event, index) => {
      return(
        <Marker
          key={index}
          lat={event.location.lat}
          lng={event.location.lng}
          label=""
          icon={this.determineMarkerIcon(event)}>
        </Marker>
      )
    })
  }

  determineMarkerIcon(event) {
    let capacity = event.participants.length / event.maxParticipants;
    if(capacity < 0.125) {
      capacity = "empty";
    } else if(capacity < 0.375) {
      capacity = "almost-empty";
    } else if(capacity < 0.625) {
      capacity = "half-full";
    } else if(capacity < 0.875) {
      capacity = "almost-full";
    } else {
      capacity = "full";
    }
    if(!imgs[event.type]) {
      return "/imgs/caution.png";
    }
    return "/imgs/" + capacity + "/" + event.type + ".png";
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
            { this.eventMarkers() }
          </Gmaps>
        </div>
        <div>
          <PopupDetail event={this.state.openEvent} detailOpen={this.state.detailOpen}/>
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

