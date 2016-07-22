import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  color: {
    color: "white"
  }
};

class Radius extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (

      <div >
      <MuiThemeProvider>
      <DropDownMenu value={this.state.value} style={{color: 'white'}} onChange={this.handleChange}>
        <MenuItem value={1} primaryText="5 Miles Radius" />
        <MenuItem value={2} primaryText="10 Miles Radius" />
        <MenuItem value={3} primaryText="15 Miles Radius" />
      </DropDownMenu>
      </MuiThemeProvider>
      </div>
    )
  }
}

export default Radius