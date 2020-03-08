import { PROCESS_ADD_LIST } from '../../actionTypes'
import Process from '../../../struct/Process'

export default (processAmmount) => dispatch => {

  const list = Array(processAmmount).fill(1).map((_, index) => (
    new Process({
      id: index,
      name: 'Process ' + index,
      status: 'ready'
    })
  ))
  console.warn(list, "process")

  dispatch({ type: PROCESS_ADD_LIST, payload: list })
}
