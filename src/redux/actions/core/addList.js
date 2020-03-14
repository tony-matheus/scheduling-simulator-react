import { CORE_ADD_LIST } from '../../actionTypes'
import Core from '../../../struct/Core'

export default (coresAmount, algType, quantum = -1) => dispatch => {
  const list = Array(coresAmount).fill(1).map((_, index) => {
    if (algType === 'Round Robin')
      return new Core({
        id: index + 1,
        name: 'Core ' + (index + 1),
        status: 'waiting',
        processInExecution: 'none',
        quantum,
        processTimeLeft: quantum
      });

    return new Core({
      id: index,
      name: 'Core ' + index,
      status: 'waiting',
      processInExecution: 'none',
      processTimeLeft: -1
    })
  })

  dispatch({ type: CORE_ADD_LIST, payload: list })
}
