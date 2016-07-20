import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class GamesListHome extends Component {

  renderList() {
    console.log('renderlist');
    return this.props.getGames.map((game) => {
      console.log('here', game)
      return (
        <div className="card card-panel hoverable" key={game.id}>
          <div className="card-title">
            <h3>Event: {game.type}</h3>
          </div>
            <h3 className="left-align">Players Needed: {game.maxParticipants}</h3>
            <h4 className="center-align">Time: {moment(game.time).format('MMMM Do YYYY, h:mm a')}</h4>
            <h4 className="center-align">Location: {game.name}</h4>
            <p className="card-text">Rules: {game.details}</p>
          <div className="card-action">
            <p className="left-align">Host: {game.user.name}</p>
          </div>
        </div>
      )
    })
  }

  render() {
    console.log(this.props.getGames, 'getGames inside of GamesListHome')
      return (
        <div className="valign-wrapper">
          <div className="valign center-block">
            {this.renderList()}
          </div>
        </div>
      )
    }
  }

function mapStateToProps(state) {
  return {
    getGames: state.getGames
  }
}

export default connect(mapStateToProps)(GamesListHome)