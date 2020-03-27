import React from 'react'
import styled from 'styled-components'
import withLogic from './withLogic'
import CoreList from '../CoreList'
import ProcessList from '../ProcessList'
import { Button } from 'antd'

export const NewProcessButton = styled(Button)`
  position: fixed;
  top: 100px;
  right: 30px;
`

const Scheduler = ({ coreList, processList, terminatedList, onAddProcess }) => {
  return (
    <>
      <NewProcessButton onClick={onAddProcess}>Add New Process</NewProcessButton>
      <CoreList coreList={coreList} />
      <ProcessList processList={processList} />
      <ProcessList processList={terminatedList} title="Finish Process" />
    </>
  )
}

export default withLogic(Scheduler)
