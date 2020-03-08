import { CORE_ADD_INFO } from '../../actionTypes'
import Core from '../../../struct/Core'

export default (coresAmount, algType, quantum = -1) => dispatch => {
  const list = Array(coresAmount).fill(1).map((_, index) => {
    if (algType === 'Round Robin')
      return new Core({
        id: index,
        name: 'Core ' + index,
        status: 'waiting for process',
        processInExecution: 'none',
        currentQuantum: quantum,
        processTimeLeft: -1
      });

    return new Core({
      id: index,
      name: 'Core ' + index,
      status: 'waiting for process',
      processInExecution: 'none',
      processTimeLeft: -1
    })
  })

  dispatch({ type: CORE_ADD_INFO, payload: list })
}
