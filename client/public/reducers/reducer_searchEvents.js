import { SEARCH_EVENTS } from '../actions/index';

export default (state = [], action) => {
  switch(action.type){
    case SEARCH_EVENTS:
      return action.payload;
  }
  return state;
}
