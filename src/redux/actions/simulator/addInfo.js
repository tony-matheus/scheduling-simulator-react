import { SIMULATOR_ADD_INFO } from '../../actionTypes'

export default (info) => dispatch => {
  dispatch({ type: SIMULATOR_ADD_INFO, payload: info })
}
