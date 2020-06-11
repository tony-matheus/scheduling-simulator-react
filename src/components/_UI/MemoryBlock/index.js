import React from 'react'
import {
  Container,
  StatusBar,
  Wrapper,
  TopWrapper,
  TextWrapper,
  Title,
  SubTitle,
  StatusText,
  BottomWrapper,
  TimeColumn,
  TimeText,
  TimeCount
} from './styles'

const MemoryBlockCard = ({ index = 1, size, occupiedSize, status, pid, blockId, nextFreeBlock, totalBlockSize }) => {
  return (
    <Container size={size}>
      <TopWrapper status='free'>
        <TextWrapper>
          <Title>Index</Title>
          <SubTitle>{blockId}</SubTitle>
        </TextWrapper>
      </TopWrapper>
      <TopWrapper status='free'>
        <TextWrapper>
          <Title>Next Free Block</Title>
          <SubTitle>{(nextFreeBlock || 'null')}</SubTitle>
        </TextWrapper>
      </TopWrapper>
      <TopWrapper status={status}>
        <TextWrapper>
          <Title>Occupied Size</Title>
          <SubTitle>{occupiedSize}</SubTitle>
        </TextWrapper>
      </TopWrapper>
      <TopWrapper status={status}>
        <TextWrapper>
          <Title>Total Size</Title>
          <SubTitle>{totalBlockSize}</SubTitle>
        </TextWrapper>
      </TopWrapper>
      <TopWrapper status={status}>
        <TextWrapper>
          <Title>PID</Title>
          <SubTitle>{pid}</SubTitle>
        </TextWrapper>
      </TopWrapper>
      <TopWrapper status={status}>
        <TextWrapper>
          <Title>%</Title>
          <SubTitle>{size}%</SubTitle>
        </TextWrapper>
      </TopWrapper>
    </Container>
  )
}

export default MemoryBlockCard
