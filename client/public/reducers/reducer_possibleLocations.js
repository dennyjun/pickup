import { POSSIBLE_LOCATIONS } from '../actions/index';
import { CLEAR_LOCATIONS } from '../actions/index';

export default (state = [], action) => {
  switch(action.type){
    case POSSIBLE_LOCATIONS:
      return action.payload;
    case CLEAR_LOCATIONS:
      return action.payload; 
  }
  return state;
}
