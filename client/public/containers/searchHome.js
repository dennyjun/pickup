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
    for(let i = 0; i < this.props.searchGames.length; i ++) {
      if(uniqueId === this.props.searchGames[i].id) {
        let fromStringToArray = JSON.parse(this.props.searchGames[i].joinedPlayers);
        fromStringToArray.push(this.state.newPlayerName);
        
        let addedJoinedPlayer = JSON.stringify(fromStringToArray)
        
        this.props.searchGames[i].joinedPlayers = addedJoinedPlayer;
        
        this.props.searchGames[i].maxParticipants--;
        this.props.submitPlayer(this.props.searchGames[i]);
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

  searchedGameCards() {
    return this.props.searchGames.map((game) => {
      console.log('show', game);
      return(
        <div className="valign-wrapper" data-id={game.id}>
          <div className="valign center-block">

                <div className="card card-panel hoverable">
                  <div className="card-title">
                  <p><strong>ID: </strong>{String.fromCharCode(game.id + 64)}</p>
                    <h4 className="center-align">
                      {game.type}
                    </h4>

                  </div>
                    <h5 className="left-align">
                      <i className="fa fa-globe fa-lg" aria-hidden="true"></i> 
                      &nbsp; &nbsp;{game.name}
                    </h5>
                    <h5 className="left-align">
                      <i className="fa fa-calendar" aria-hidden="true"></i> 
                      &nbsp; &nbsp;{moment(game.time).format('MMMM Do YYYY \n h:mm a')}
                    </h5>
                    <h5 className="center-align">
                      waiting for <strong>{game.maxParticipants}</strong> players
                    </h5>
                    <h5 className="card-text center-align"><strong>Rules:</strong> {game.details}</h5>
                    {this.renderAction(game.maxParticipants)}
                    <p className="left-align">
                      <i className="fa fa-star" aria-hidden="true"></i> 
                      &nbsp; &nbsp;{game.user.name}
                    </p>
                    <ul>
                      <i className="fa fa-users fa-lg" aria-hidden="true"></i> 
                      <li>{this.displayJoinedPlayer(game.participants)}</li>
                    </ul>
                </div>

          </div>                    
        </div>
      )
    })
  }

   gameMarkers() {
    return this.props.searchGames.map((game) => {
      return(
        <Marker
          lat={game.location.lat}
          lng={game.location.lng}
          label={String.fromCharCode(game.id + 64)}
          draggable={false}
          onDragEnd={this.onDragEnd} />
      )
    })
  }

 

  render() {
    return (
      <div>

      <div id="gamesView">
        {this.searchedGameCards()}
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
            { this.gameMarkers() }
          </Gmaps>
        </div>


      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    searchGames: state.searchGames,
    determinedLocation: state.determinedLocation
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ submitPlayer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchHome)

