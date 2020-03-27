import { PROCESS_ADD_LIST } from '../../actionTypes'
import Process from '../../../struct/Process'

export default (processAmmount, whichAlg = '') => dispatch => {
  const list = Array(processAmmount).fill(1).map((_, index) => (
    new Process({
      id: index + 1,
      name: 'Process ' + (index + 1),
      state: 'ready'
    })
  ))

  dispatch({ type: PROCESS_ADD_LIST, payload: list })
}
