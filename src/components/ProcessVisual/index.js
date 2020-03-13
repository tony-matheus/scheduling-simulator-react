import React from 'react'
import styled from 'styled-components'

export const List = styled.div`
  display: flex;
`

export const Container = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  background-color: green;
  ${({state}) => state === 'running' && 'background-color: blue;'}
  ${({state}) => state === 'terminated' && 'background-color: red;'}
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

const CoreVisual = ({ processList }) => {
  return (
    <List>
      {(processList || []).map((process, index) => (
        <Container key={index} state={process.state}>
          <Wrapper>
            <span>Name: {process.name}</span>
          </Wrapper>
          <Wrapper>
            <span>Id: {process.id}</span>
          </Wrapper>
          <Wrapper>
            <span>state: {process.state}</span>
          </Wrapper>
          <Wrapper>
            <span>Process Time Left: {process.remainingTime}</span>
          </Wrapper>
          <Wrapper>
            <span>Process total time: {process.totalTIme}</span>
          </Wrapper>
        </Container>
      ))}
    </List>
  )
}

export default CoreVisual
