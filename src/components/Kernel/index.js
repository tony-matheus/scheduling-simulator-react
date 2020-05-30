import React from 'react'
import Scheduler from '../Scheduler'
import withLogic from './withLogic'
import styled from 'styled-components'
import { Button } from 'antd'
import MemoryManagerUi from '../MemoryManager'

export const NewProcessButton = styled(Button)`
  position: fixed;
  top: 100px;
  right: 30px;
`

export const DisableProcessButton = styled(Button)`
  position: fixed;
  top: 170px;
  right: 30px;
`

export const Container = styled.div`
  display: flex;
`

export const Column = styled.div`
  width: 50%;
`

const Kernel = ({
  whichAlg,
  nextProcess,
  getProcess,
  reOrderProcess,
  isCoreWorking,
  createProcess,
  reOrderTimes,
  changeIsDisableRandom,
  isDisableRandom,
  setIsDisableRandom,
  coreList,
  processList,
  terminatedProcessList,
  changeData,
  // Memory
  memoryAllocation,
  totalMemoryUsed,
  freeMemory
}) => {
  return (
    <>
      <MemoryManagerUi totalMemoryUsed={totalMemoryUsed} />
      <DisableProcessButton onClick={() => setIsDisableRandom(!isDisableRandom)}>
        {(isDisableRandom) ? 'Enable' : 'Disable'} Random Process
      </DisableProcessButton>
      <Scheduler
        WhichAlg={whichAlg}
        kernelCreateProcess={createProcess}
        coreList={coreList}
        processList={processList}
        terminatedProcessList={terminatedProcessList}
        kernelChangeData={changeData}
        // Kernel Function
        memoryAllocation={memoryAllocation}
        freeMemory={freeMemory}
      />
    </>
  )
}

export default withLogic(Kernel)
