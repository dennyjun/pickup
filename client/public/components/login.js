import React, { Component, PropTypes } from 'react';
import Signup from './signup';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  handleSubmit(event) {
    event.preventDefault();

    const username = this.refs.username;
    const password = this.refs.password;
    const credentials = {
      username: username.value.trim(),
      password: password.value.trim()
    }

    axios.post('/auth/login', credentials)
    .then((token) => {
      console.log(token);
      return token;
    })
    .catch((err) => {
      console.log("Error logging in!");
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input className='form-control' type='text' ref='username' placeholder='Username' />
          <input className='form-control'  type='password' ref='password' placeholder='Password' />
          <button className='btn btn-primary' type='submit'>Login</button>
        </form>
      </div>
    )
  }
}