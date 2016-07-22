import { GET_EVENTS } from '../actions/index';

export default (state = [], action) => {
  switch(action.type){
    case GET_EVENTS:
      return action.payload;
  }
  return state;
}
