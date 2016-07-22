import React, { Component } from 'react';
import { Link } from 'react-router';
import SearchHome from '../containers/searchHome';
import FindCreate from './findCreate.js';
import Login from './login';

export default class App extends Component {

  render() {
    return (
      <div>
        <h1 className="center-align">PickUp</h1>
        <div className="valign-wrapper">
          <div className="valign center-block">

            <FindCreate />

          </div>
        </div>

            {this.props.children}

      </div>
    )
  }
}