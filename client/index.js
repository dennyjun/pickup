import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import thunk from 'redux-thunk'

import App from './public/components/app'
import reducer from './public/reducers'
import NavBar from './public/components/navBar'
import Search from './public/containers/search'
import Add from './public/containers/add'
import EventListHome from './public/containers/eventListHome'
import SearchHome from './public/containers/searchHome'
import Login from './public/components/login'
import Signup from './public/components/signup'
import injectTapEventPlugin from 'react-tap-event-plugin';


const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore)(reducer);

injectTapEventPlugin();

const router = (
    <Provider store={createStoreWithMiddleWare}>
      <Router history={browserHistory}>
        <Route path="/" component={App} >
          <Route path="/signup" component={Signup} />
          <IndexRoute component={Search} />
          <Route path="/Search" component={Search} />
          <Route path="/Add" component={Add} />
          <Route path="/login" component={Login} />
        </Route>   
        <Route path="/NavBar" component={NavBar} >
          <Route path="/SearchHome" component={SearchHome} />
          <Route path="/EventListHome" component={EventListHome} />
        </Route>
      </Router>
    </Provider>
)

 render(router,document.getElementById('app'));

