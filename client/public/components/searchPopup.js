import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

class SearchPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};

    injectTapEventPlugin();
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
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>

      <MuiThemeProvider>
        <FlatButton className="red white-text" label="New Search" onTouchTap={this.handleOpen} />
      </MuiThemeProvider>
      <MuiThemeProvider>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

        </Dialog>
      </MuiThemeProvider>
      </div>
    )
  }
}

export default SearchPopup