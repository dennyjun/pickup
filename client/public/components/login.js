import React, { Component, PropTypes } from 'react';
import Signup from './signup';

export default class Login extends Component {

  handleSubmit(event) {
    event.preventDefault();

    const username = this.refs.username;
    const password = this.refs.password;
    const credentials = {
      username: username.value.trim(),
      password: password.value.trim()
    }

    console.log('Clicking working!', credentials);

  }

  render() {
    console.log("I love lesbians byaaaaa");
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