import axios from 'axios';
import { browserHistory } from 'react-router';

export const SUBMIT_GAME = 'SUBMIT-GAME';
export const GET_GAMES = 'GET-GAMES';
export const SEARCH_GAMES = 'SEARCH-GAMES'; 
export const SUBMIT_PLAYER = 'SUBMIT-PLAYER'; 
export const POSSIBLE_LOCATIONS = 'POSSIBLE-LOCATIONS'; 
export const DETERMINED_LOCATION = 'DETERMINED-LOCATION';
export const CLEAR_LOCATIONS = 'CLEAR-LOCATIONS';

export function clearPossibleLocations() {
  return function(dispatch) {
    dispatch({ type: CLEAR_LOCATIONS, payload: [] })
  }
}

export function searchGames(searchObj) {
  return function(dispatch) {
  axios({
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    params: {address: searchObj.location, key: 'AIzaSyAlCGs74Skpymw9LLAjkMg-8jQ1gIue9n8'}
  })
    .then(function(response) {
      if(response.data.results.length > 1) {
        dispatch({ type: POSSIBLE_LOCATIONS, payload: response.data.results })
        throw new Error('error on search in actions')
      } else {
        searchObj.lat = response.data.results[0].geometry.location.lat
        searchObj.lng = response.data.results[0].geometry.location.lng
        searchObj.address = response.data.results[0].formatted_address
        searchObj.name = response.data.results[0].formatted_address

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
    .then(function(response) {
      browserHistory.push('/SearchHome');
      dispatch({ 
        type: SEARCH_GAMES, 
        payload: response.data
      });
    })
    .catch(function(error) {
      console.error('error in the search events axios calls', error)
    });
  }
}

export function submitGame(gameObj) {
  return function(dispatch) {
    axios({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {address: gameObj.location, key: 'AIzaSyAlCGs74Skpymw9LLAjkMg-8jQ1gIue9n8'}
    })
    .then(function(response) {
      if(response.data.results.length > 1) {
        dispatch({ type: POSSIBLE_LOCATIONS, payload: response.data.results });
        throw new Error('jist an error');
      } else {
        gameObj.lat = response.data.results[0].geometry.location.lat;
        gameObj.lng = response.data.results[0].geometry.location.lng;
        gameObj.address = response.data.results[0].formatted_address;
        gameObj.name = response.data.results[0].formatted_address;
        return axios.post('/api/events', gameObj);
      }
    })
    .then(function(response) {
     return axios.get('/api/events')
    })
    .then(function(response) {
      dispatch({ 
        type: GET_GAMES, 
        payload: response.data
      });
    })
    .catch(function(error) {
      console.log(error, 'there was an error in the submit event action')
    });
  }    
}

export function submitPlayer(playerObj) {
  return function(dispatch) {
    axios.put('/api/events', playerObj)
      .then(function(response) {
        dispatch({ type: SUBMIT_PLAYER, payload: response.data})
      })
      .catch(function(error) {
      });
  }
}
