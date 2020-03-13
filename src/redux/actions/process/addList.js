import { PROCESS_ADD_LIST } from '../../actionTypes'
import Process from '../../../struct/Process'

export default (processAmmount) => dispatch => {

  const list = Array(processAmmount).fill(1).map((_, index) => (
    new Process({
      id: index,
      name: 'Process ' + index,
      state: 'ready'
    })
  ))
  console.warn(list, "process")
  console.warn(list[processAmmount - 1], "process")

  dispatch({ type: PROCESS_ADD_LIST, payload: list })
}
