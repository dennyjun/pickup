import { SUBMIT_PLAYER } from '../actions/index';
// const arr = [
//   {id: 1, sport: "fooseball", rules: "dont suck", time: 1300, location: [{lat: '33.784284', long: '-118.242931'}], current_players: 1, playersNeeded: 2, created_by: "mike"},
//   {id: 2, sport: "baseball", rules: "hit the ball", time: 200, location: [{lat: '33.879822', long: '-118.296490'}], current_players: 1, playersNeeded: 3, created_by: "merik"},
//   {id: 3, sport: "basketball", rules: "shoot 3's", time: 700, location: [{lat: '33.978243', long: '-118.032646'}], current_players: 1, playersNeeded: 4, created_by: "phil"}
// ]

const updateEventInList = (arr, obj) => {
  const modArr = arr.map((event) => {
    if(event.id === obj.id) {
      return obj;
        console.log('inside the reducer if statement', event)
    }
      return event;
    })
    console.log(modArr)
    return modArr;
}

export default (state = [], action) => {
  switch(action.type) {
    case SUBMIT_PLAYER:
      return updateEventInList(state, action.payload);
  }
  return state;
}