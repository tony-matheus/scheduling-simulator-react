import React from 'react'
import styled from 'styled-components'
import withLogic from './withLogic'
import CoreList from '../CoreList'
import ProcessList from '../ProcessList'

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Scheduler = ({ coreList, processList, terminatedList }) => {
  return (
    <>
      <CoreList coreList={coreList} />
      <ProcessList processList={processList} />
      <ProcessList processList={terminatedList} title="Finish Process"/>
    </>
  )
}

export default withLogic(Scheduler)
