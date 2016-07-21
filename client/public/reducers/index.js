import { combineReducers } from 'redux'
import EventsReducer from './reducer_events'
import SubmitEventsReducer from './reducer_submitEvent'
import GetEventsReducer from './reducer_getEvents'
import SearchEventsReducer from './reducer_searchEvents'
import PossibleLocations from './reducer_possibleLocations'
import DeterminedLocation from './reducer_determinedLocation'

const rootReducer = combineReducers({
  events: EventsReducer,
  submitEvent: SubmitEventsReducer,
  getEvents: GetEventsReducer,
  searchEvents: SearchEventsReducer,
  possibleLocations: PossibleLocations,
  determinedLocation: DeterminedLocation,
})

export default rootReducer;