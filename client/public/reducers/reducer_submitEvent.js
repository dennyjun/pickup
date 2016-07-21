import { SUBMIT_EVENT } from '../actions/index';

export default (state = [], action) => {
  switch(action.type){
    case SUBMIT_EVENT:
      return [ action.payload.data, ...state ];
  }
  return state;
}
