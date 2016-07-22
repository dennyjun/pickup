import axios from 'axios';
import { browserHistory } from 'react-router';

export const SUBMIT_EVENT = 'SUBMIT-EVENT';
export const GET_EVENTS = 'GET-EVENTS';
export const SEARCH_EVENTS = 'SEARCH-EVENTS'; 
export const SUBMIT_PLAYER = 'SUBMIT-PLAYER'; 
export const POSSIBLE_LOCATIONS = 'POSSIBLE-LOCATIONS'; 
export const DETERMINED_LOCATION = 'DETERMINED-LOCATION';
export const CLEAR_LOCATIONS = 'CLEAR-LOCATIONS';

export function clearPossibleLocations() {
  return (dispatch) => {
    dispatch({ 
      type: CLEAR_LOCATIONS, 
      payload: [] 
    });
  }
};

export function searchEvents(searchObj) {
  return (dispatch) => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: searchObj.location, 
        key: 'AIzaSyAlCGs74Skpymw9LLAjkMg-8jQ1gIue9n8'
      }
    })
    .then((response) => {
      if(response.data.results.length > 1) {
        dispatch({ 
          type: POSSIBLE_LOCATIONS, 
          payload: response.data.results 
        });
        throw new Error('error on search in actions')
      } else {
        let result = response.data.results[0];
        searchObj.lat = result.geometry.location.lat;
        searchObj.lng = result.geometry.location.lng;
        searchObj.address = result.formatted_address;
        searchObj.name = searchObj.address;

        let determinedLocation = {
          address: searchObj.address,
          lat: searchObj.lat,
          lng: searchObj.lng
        };
        dispatch({ 
          type: DETERMINED_LOCATION,
          payload: determinedLocation
        });
        return axios.get('/api/events', searchObj);
      }
    })
    .then((response) => {
      browserHistory.push('/SearchHome');
      dispatch({
        type: SEARCH_EVENTS,
        payload: response.data
      });
    })
    .catch((error) => {
      console.error('error in the search events axios calls', error)
    });
  }
}

export function submitEvent(event) {
  return (dispatch) => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: event.location,
        key: 'AIzaSyAlCGs74Skpymw9LLAjkMg-8jQ1gIue9n8'
      }
    })
    .then((response) => {
      if(response.data.results.length > 1) {
        dispatch({ 
          type: POSSIBLE_LOCATIONS, 
          payload: response.data.results 
        });
        throw new Error('jist an error');
      } else {
        let result = response.data.results[0];
        event.lat = result.geometry.location.lat;
        event.lng = result.geometry.location.lng;
        event.address = result.formatted_address;
        event.name = event.address;
        return axios.post('/api/events', event);
      }
    })
    .then((response) => {
      return axios.get('/api/events');
    })
    .then((response) => {
      browserHistory.push('/EventListHome');
      dispatch({
        type: GET_EVENTS,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log(error, 'there was an error in the submit event action');
    });
  }    
}

export function submitPlayer(playerObj) {
  return (dispatch) => {
    axios.put('/api/events', playerObj)
      .then((response) => {
        dispatch({
          type: SUBMIT_PLAYER,
          payload: response.data
        });
      })
      .catch((error) => {
        console.error('Failed submitPlayer', error);
      });
  }
}

export function loginUser(credentials) {
  let config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${credentials.username}&password=${credentials.password}`
  };

  const login = axios.post('/api/users/login', config);

  // Need endpoint for getting session
  const getToken = axios.post(/* endpoi,*/ config);

  function requestLogin(credentials) {
    return {
      type: 'LOGIN_REQUEST',
      fetching: true,
      authenticated: false,
      credentials: credentials
    }
  };

  function receiveLogin(user) {
    return {
      type: 'LOGIN_SUCCESS',
      fetching: false,
      authenticated: true,
      token: user.token
    }
  };

  function failLogin(message) {
    return {
      type: 'LOGIN_FAILURE',
      fetching: false,
      authenticated: false,
      message: message
    }
  };

  return (dispatch) => { 
    dispatch(requestLogin(credentials));

    return login
    .then((token) => {
      token.json()
      .then((user) => {
        console.log(user);
      })
    });
  }
}
