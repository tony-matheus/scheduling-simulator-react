import React from 'react'
import styled from 'styled-components'
import MemoryBlockCard from '../_UI/MemoryBlock'

export const Container = styled.div`
  padding: 10px;
`
export const Wrapper = styled.div`
  padding: 10px;
  border: 1px solid green;
`
export const TitleWrapper = styled.div`
  display: flex;
  justify-content:space-between;
`

export const Title = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 26px;
  line-height: 20px;
`

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const MemoryManagerUi = ({ memoryManager }) => {
  return (
    <Container>
      <TitleWrapper>
        <Title>Memory List {memoryManager.totalMemory} </Title>
        <Title>First Free Block {memoryManager.freeBlockList} </Title>
      </TitleWrapper>
      <List>
        {(memoryManager.memory || []).map((memoryBlock, index) => (
          <MemoryBlockCard
            key={index}
            size={Math.ceil((memoryBlock.totalBlockSize / memoryManager.totalMemory) * 100)}
            {...memoryBlock}
          />
        ))}
      </List>
    </Container>
  )
}

export default MemoryManagerUi