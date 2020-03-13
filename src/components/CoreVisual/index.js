import React from 'react'
import styled from 'styled-components'

export const List = styled.div`
  display: flex;
`

export const Container = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  background-color: blue;
  ${({status}) => status === 'busy' && 'background-color: red;'}
  ${({status}) => status === 'running' && 'background-color: green;'}
  color: white;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 200px;
`

export const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const CoreVisual = ({ coreList }) => {
  return (
    <List>
      {(coreList || []).map((core, index) => (
        <Container key={index}  status={core.status}>
          <Wrapper>
            <span>Name: {core.name}</span>
          </Wrapper>
          <Wrapper>
            <span>Id: {core.id}</span>
          </Wrapper>
          <Wrapper>
            <span>status: {core.status}</span>
          </Wrapper>
          <Wrapper>
            <span>process: {core.processInExecution.name}</span>
          </Wrapper>
          <Wrapper>
            <span>Time Left: {core.processTimeLeft}</span>
          </Wrapper>
          <Wrapper>
            <span>Process Time Left: {core.processInExecution.remainingTime}</span>
          </Wrapper>
        </Container>
      ))}
    </List>
  )
}

export default CoreVisual
