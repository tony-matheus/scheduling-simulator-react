import { PROCESS_ADD_LIST } from '../actionTypes'

const initialState = {
  list: []
}

export default function(state = initialState, action){
  switch(action.type) {
    case PROCESS_ADD_LIST:{
      return { 
        ...state,
        list: action.payload
      }
    }
    default: 
      return state;
  }
}
