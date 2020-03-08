import { PROCESS_ADD_LIST } from '../../actionTypes'
import Core from '../../../struct/Core'

export default (processAmmount, algType, lastProcessList, quantum = -1) => dispatch => {

  const list = Array(processAmmount).fill(1).map((_, index) => {
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

  dispatch({ type: PROCESS_ADD_LIST, payload: list })
}
