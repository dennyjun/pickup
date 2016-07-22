import React, { Component } from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import { submitPlayer } from '../actions/index';
import moment from 'moment';

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
      newPlayerName: ''
    }
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  };

  playerEntryInputChange(event) {
    this.setState({
      newPlayerName: event.target.value
    })
  };

  showNameEntry(event) {
    this.setState({
      newPlayerName: ''
    })

    $('.newPlayerEntry').hide()
    $(event.target).siblings('.newPlayerEntry').show()
  };

  submitNewPlayerEntry(event) {
    let uniqueId = Number($(event.target).parents('.valign-wrapper').attr('data-id'));
    for(let i = 0; i < this.props.searchEvents.length; i ++) {
      if(uniqueId === this.props.searchEvents[i].id) {
        let fromStringToArray = JSON.parse(this.props.searchEvents[i].joinedPlayers);
        fromStringToArray.push(this.state.newPlayerName);
        
        let addedJoinedPlayer = JSON.stringify(fromStringToArray)
        
        this.props.searchEvents[i].joinedPlayers = addedJoinedPlayer;
        
        this.props.searchEvents[i].maxParticipants--;
        this.props.submitPlayer(this.props.searchEvents[i]);
      }
    }
    this.setState({
      newPlayerName: ''
    })
    event.preventDefault()
  }

  displayJoinedPlayer(joinedPlayers) {
    return joinedPlayers.map((player) => {
      return (
        <li>
          {player}
        </li>
      )
    })
  }

  renderAction(maxParticipants) {
    if(maxParticipants <= 0) {
      return;
    } else {
      return(
        <div className="card-action">
          <button className="btn red waves-effect waves-light" onClick={this.showNameEntry.bind(this)} type="submit" name="action"> <i className="material-icons right">send</i>Join
            </button>
            <form className="newPlayerEntry" onSubmit={this.submitNewPlayerEntry.bind(this)}>
              <input onChange={this.playerEntryInputChange.bind(this)} value={this.state.newPlayerName} type='text' placeholder='Enter Your Name'></input>
            </form>
        </div>
      )
    }
  }

  searchedEventCards() {
    return this.props.searchEvents.map((event) => {
      return(
        <div className="valign-wrapper" data-id={event.id}>
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
                  waiting for <strong>{event.maxParticipants}</strong> players
                </h5>
                <h5 className="card-text center-align"><strong>Rules:</strong> {event.details}</h5>
                {this.renderAction(event.maxParticipants)}
                <p className="left-align">
                  <i className="fa fa-star" aria-hidden="true"></i> 
                  &nbsp; &nbsp;{event.user.name}
                </p>
                <ul>
                  <i className="fa fa-users fa-lg" aria-hidden="true"></i> 
                  {this.displayJoinedPlayer(event.participants)}
                </ul>
            </div>
          </div>                    
        </div>
      )
    })
  }

  eventMarkers() {
    return this.props.searchEvents.map((event) => {
      return(
        <Marker
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

