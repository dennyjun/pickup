import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchEvents, clearPossibleLocations } from '../actions/index';
import $ from 'jquery';

class Search extends Component { 

  constructor(props) {
    super(props)

    this.state = {
      dropDownSport: "",
      locationInput: ""
    }
  }

  componentDidUpdate() {
    if(this.props.possibleLocations.length > 1) {
      $('.modal').show();
    }
  }

  listOfPossibleLocations() {
    return this.props.possibleLocations.map((location) =>{
       return(
        <div className="listOfPossibleLocations center-align" onClick={ this.onLocationSubmit.bind(this, location.formatted_address) }>{ location.formatted_address }</div>
      )
    })
  }

  sportsSelect(event) {
    this.setState({
      dropDownSport: event.target.value
    })
  } 

  onLocationSubmit(args) {  
  let fixedLocation;
    if(typeof arguments[0] === 'string') {
      fixedLocation = arguments[0];
      arguments[1].preventDefault();
    } else {
      arguments[0].preventDefault()
      fixedLocation = this.state.locationInput;
      this.setState({
        locationInput: ''
      })
    }
    this.props.searchEvents( { sport: this.state.dropDownSport, location: fixedLocation } );
    this.props.clearPossibleLocations();
  }

  onLocationEnter(event) {
    this.setState({
      locationInput: event.target.value
    })
  }


render() {
    return (

      <div className="valign-center">
        <div className="valign center-block">

          <div id="modal1" className="modal">
            <div className="modal-content">
              <h4 className="center-align">Confirm Location</h4>
              <div>{ this.listOfPossibleLocations() }</div>
            </div>
          </div>

          <br />

          <div className="row">
            <form className="inputBox" onSubmit={this.onLocationSubmit.bind(this)}>
              <div className="col s6 offset-s3 center-align">
                <input value={this.state.locationInput} onChange={this.onLocationEnter.bind(this)} type='text' placeholder='Enter City Name'/>
              </div>

              <div className="col offset-s3">
                <input className="btn red waves-effect waves-light btn valign center-block" value="Search" type="submit" />
              </div>
            </form>   
          </div>

          <br />

          <div>
            <h5 className="center-align"><strong>Welcome to PickUp! Enter your location to find a event near: <span>{this.state.locationInput}</span></strong></h5>
          </div>



        </div>           
      </div>
    )
  }  
}

function mapStateToProps(state) {
  return {
    possibleLocations: state.possibleLocations
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ searchEvents, clearPossibleLocations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)

