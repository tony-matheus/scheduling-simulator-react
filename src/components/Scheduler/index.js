import React, { useState } from 'react'
import styled from 'styled-components'
import withLogic from './withLogic'
import CoreList from '../CoreList'
import ProcessList from '../ProcessList'
import { Button, Slider } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export const Wrapper = styled.div`
  ${({ show }) => show || 'display: none;'}
`

export const HideShowButton = styled(Button)`
  position: fixed;
  top: 380px;
  right: 0;
`

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

export const StopSchedulerButton = styled(Button)`
  position: fixed;
  top: 240px;
  right: 30px;
`

export const Container = styled.div`
  display: flex;
`

export const Column = styled.div`
  width: 50%;
`

export const SliderWrapper = styled.div`
  position: fixed;
  top: 310px;
  right: 30px;
  width: 300px;
  display: flex;
  color: white;
  justify-content: space-between;
`

export const SliderBarWrapper = styled.div`
  width: 250px;
`

const Scheduler = ({
  coreList,
  processList,
  changeScheduleProcess,
  killProcess,
  stopSchedule,
  terminatedList,
  abortedProcessList,
  onAddProcess,
  isDisableRandom,
  setIsDisableRandom,

  changeTime,
  time
}) => {
  const [show, setShow] = useState(true)
  return (
    <>
      <HideShowButton onClick={() => setShow(!show)}>
        {show ? 'hide' : 'show'}
      </HideShowButton>
      <Wrapper show={show}>
        <NewProcessButton onClick={onAddProcess}>
          <PlusOutlined />
        Process
        </NewProcessButton>
        <DisableProcessButton onClick={() => setIsDisableRandom(!isDisableRandom)}>
          {(isDisableRandom) ? 'Enable' : 'Disable'} Random Process
        </DisableProcessButton>
        <StopSchedulerButton onClick={changeScheduleProcess}>
          {stopSchedule ? 'Start' : 'Stop'}
        Scheduler
        </StopSchedulerButton>
        <SliderWrapper>
          <span>100 ms</span>
          <SliderBarWrapper>
            <Slider
              min={100}
              max={1000}
              onChange={changeTime}
              value={typeof time === 'number' ? time : 1000}
            />
          </SliderBarWrapper>
          <span>1000 ms</span>
        </SliderWrapper>
      </Wrapper>
      <CoreList coreList={coreList} />
      <Container>
        <Column>
          <ProcessList killProcess={killProcess} processList={processList.filter(proc => proc.state !== 'running')} />
        </Column>
        <Column>
          <ProcessList processList={terminatedList.sort()} title='Finish Process' />
        </Column>
        <Column>
          <ProcessList processList={abortedProcessList.sort()} title='Aborted Processes' />
        </Column>
      </Container>
    </>
  )
}

export default withLogic(Scheduler)
