import { DETERMINED_LOCATION } from '../actions/index';

export default (state = [], action) => {
  switch(action.type){
    case DETERMINED_LOCATION:
      return action.payload;
  }
  return state;
}
