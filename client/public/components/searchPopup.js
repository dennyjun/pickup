import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import { searchEvents, clearPossibleLocations } from '../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SearchPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      locInput: ""
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  onLocationSubmit(args) {  
  let fixedLocation;
    if(typeof arguments[0] === 'string') {
      fixedLocation = arguments[0];
      arguments[1].preventDefault();
    } else {
      arguments[0].preventDefault()
      fixedLocation = this.state.locInput;
      this.setState({
        locInput: ''
      })
    }
    this.props.searchEvents( { location: fixedLocation } );
    this.props.clearPossibleLocations();
  }


  onLocationEnter(event) {
    this.setState({
      locInput: event.target.value
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <a href="#" onClick={this.handleOpen}>SEARCH</a>
      <MuiThemeProvider>

        <Dialog
          title="Search New City"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

          <form className="inputBox" onSubmit={this.onLocationSubmit.bind(this)}>
            <input value={this.state.locInput} onChange={this.onLocationEnter.bind(this)} type="text" placeholder="Enter City Name" />
            <input className="btn red waves-effect waves-light valign center-block" value="Search" type="submit" onClick={this.handleClose} />
            <span> </span>
            <input className="btn red waves-effect waves-light valign center-block" value="Cancel" type="button" onClick={this.handleClose} />
          </form>
        </Dialog>

      </MuiThemeProvider>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPopup)