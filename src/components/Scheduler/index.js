import React from 'react'
import withLogic from './withLogic'
import CoreVisual from '../CoreVisual'
import ProcessVisual from '../ProcessVisual'


const Scheduler = ({coreList, processList}) => {
  return (
    <>
    <CoreVisual coreList={coreList} />
    <ProcessVisual processList={processList} />
    </>
  )
}

export default withLogic(Scheduler)
