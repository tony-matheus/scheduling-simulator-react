import { SIMULATOR_RESET_INFO } from '../../actionTypes'

export default () => dispatch => {
  dispatch({type: SIMULATOR_RESET_INFO})
}
