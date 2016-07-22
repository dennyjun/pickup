import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SearchPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

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

          <form>
            <input type="text" placeholder="Enter City Name" />
            <input className="btn red waves-effect waves-light btn valign center-block" value="Search" type="submit" onClick={this.handleClose}/>
            <span> </span>
            <button className="btn red waves-effect waves-light btn valign center-block" onClick={this.handleClose}>Cancel</button>
          </form>
        </Dialog>

      </MuiThemeProvider>
      </div>
    )
  }
}

export default SearchPopup