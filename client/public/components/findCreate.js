import React, { Component } from 'react';
import { Link } from 'react-router';

class FindCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      insideCreate: false
    }
  }

  toggleButton() {
    this.setState({
      insideCreate: !this.state.insideCreate
    })
  }

  render() {
    if(this.state.insideCreate) {
      return (
        <button className="btn waves-effect waves-light btn"><Link to="/Search" className="linkFont" onClick={() => (this.toggleButton())}>Find a Game</Link></button>
      )
    } else {
      return (
        <button className="btn waves-effect waves-light btn"><Link to="/Add" className="linkFont" onClick={() => (this.toggleButton())}>Create a Game</Link></button>
      )
    }
  }
}

export default FindCreate