import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

export default class Signup extends Component {

  handleSubmit(event) {
    // event.preventDefault();

    // const username = this.refs.username;
    // const password = this.refs.password;
    // const credentials = {
    //   username: username.value.trim(),
    //   password: password.value.trim()
    // }
    browserHistory.push("/login");
    // console.log('Clicking working!', credentials);

  }

  render() {
    console.log("hello");
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input className='form-control' type='text' ref='username' placeholder='Username' />
          <input className='form-control'  type='password' ref='password' placeholder='Password' />
          <button className='btn btn-primary' type='submit'>Signup</button>
        </form>
        <div>
          <span>Already registered? </span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    )
  }
}