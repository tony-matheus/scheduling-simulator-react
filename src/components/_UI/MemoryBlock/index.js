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
  TimeCount,
  LineWrapper
} from './styles'

const MemoryBlockCard = ({ index = 1, size, occupiedSize, status, pid, blockId, nextFreeBlock, totalBlockSize }) => {
  return (
    <Container size={size}>
      <LineWrapper>
        <TopWrapper status='free'>
          <TextWrapper>
            <Title>Index</Title>
            <SubTitle>{blockId}</SubTitle>
          </TextWrapper>
        </TopWrapper>
        <TopWrapper status='free'>
          <TextWrapper>
            <Title>Next Free</Title>
            <SubTitle>{(nextFreeBlock || 'null')}</SubTitle>
          </TextWrapper>
        </TopWrapper>
      </LineWrapper>

      <LineWrapper>
        <TopWrapper status={status}>
          <TextWrapper>
            <Title>Occupied</Title>
            <SubTitle>{occupiedSize}</SubTitle>
          </TextWrapper>
        </TopWrapper>
        <TopWrapper status={status}>
          <TextWrapper>
            <Title>Total</Title>
            <SubTitle>{totalBlockSize}</SubTitle>
          </TextWrapper>
        </TopWrapper>
      </LineWrapper>
      <LineWrapper>
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
      </LineWrapper>
    </Container>
  )
}

export default MemoryBlockCard
