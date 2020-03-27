import { SIMULATOR_RESET_INFO, SIMULATOR_ADD_INFO} from '../actionTypes'

const initialState = {
  algorithmName: '',
  quantum: 0, 
}

export default function(state = initialState, action){
  switch(action.type) {
    case SIMULATOR_ADD_INFO: {
      return {
        ...state,
        ...action.payload
      }
    }
    case SIMULATOR_RESET_INFO:{
      return { ...initialState }
    }
    default: 
      return state;
  }
}
