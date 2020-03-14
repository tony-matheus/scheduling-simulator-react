import React from 'react'
import {
  Container,
  StatusBar,
  Wrapper,
  TopWrapper,
  TextWrapper,
  Title,
  StatusText,
  BottomWrapper,
  TimeColumn,
  TimeText,
  TimeCount,
} from './styles'


const ProcessCard = ({ name, state, remainingTime, totalTIme }) => {
  return (
    <Container >
      <Wrapper>
        <TopWrapper state={state}>
          <TextWrapper >
            <Title>{name}</Title>
          </TextWrapper>
          <StatusText state={state}>{state}</StatusText>
        </TopWrapper>
        <BottomWrapper>
          <TimeColumn state={state}>
            <TimeText> Process Time Left</TimeText>
            <TimeCount> {remainingTime}s</TimeCount>
          </TimeColumn>
          <TimeColumn state={state}>
            <TimeText> Process Total Time</TimeText>
            <TimeCount> {totalTIme}s</TimeCount>
          </TimeColumn>
        </BottomWrapper>
      </Wrapper>
      <StatusBar state={state} />
    </Container>
  )
}

export default ProcessCard
