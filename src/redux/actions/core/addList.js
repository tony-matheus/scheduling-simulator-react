import { CORE_ADD_LIST } from '../../actionTypes'
import Core from '../../../struct/Core'

export default (coresAmount, algType, quantum = -1) => dispatch => {
  const list = Array(coresAmount).fill(1).map((_, index) => {
    console.log(algType)
    console.log(algType === 'Round Robin')
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

  console.error(list, "cores")

  dispatch({ type: CORE_ADD_LIST, payload: list })
}
