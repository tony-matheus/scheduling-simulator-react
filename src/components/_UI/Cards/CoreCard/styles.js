import styled from 'styled-components/macro'
import theme from '../../../../utils/theme'

export const Container = styled.div`
  width: ${182 + (182 * 0.5)}px;
  height: ${87 + (87 * 0.5)}px;
  background-color: ${theme.dark.black};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin: 10px;
`

export const StatusBar = styled.div`
  ${({ status }) => {
    switch (status) {
      case 'waiting':
        return `background-color: ${theme.dark.yellow};`
      case 'busy':
        return `background-color: ${theme.dark.red};`
      default:
        return `background-color: ${theme.dark.green};`
    }
  }}
  width: 5%;
  height: 100%;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 7px;
  padding-right: 7px;
  width: 95%;
`

export const TopWrapper = styled.div`
  ${({ status }) => {
    switch (status) {
      case 'waiting':
        return `border-bottom: 1px solid ${theme.dark.yellow};`
      case 'busy':
        return `border-bottom: 1px solid ${theme.dark.red};`
      default:
        return `border-bottom: 1px solid ${theme.dark.green};`
    }
  }}
  padding: 10px 0 10px 5px;
  display: flex; 
  justify-content: space-between;
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: ${16 + (16 * 0.5)}px;
  line-height: ${20 + (20 * 0.5)}px;
  color: white;
`

export const SubTitle = styled(Title)`
  font-size: ${10 + (10 * 0.5)}px;
  line-height: ${12 + (12 * 0.5)}px;
`

export const StatusText = styled(Title)`
  font-size: ${8 + (8 * 0.5)}px;
  line-height: ${10 + (10 * 0.5)}px;
`

export const BottomWrapper = styled.div`
  display: flex;
  padding: 6px 0;
  /* justify-content: space-between; */
`

export const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  ${({ status }) => {
    switch (status) {
      case 'waiting':
        return `border-right: 1px solid ${theme.dark.yellow};`
      case 'busy':
        return `border-right: 1px solid ${theme.dark.red};`
      default:
        return `border-right: 1px solid ${theme.dark.green};`
    }
  }}
`

export const TimeText = styled(Title)`
  font-size: 14px;
  line-height: 6px;
  text-align: center;
`

export const TimeCount = styled(TimeText)`
  font-size: 16px;
  line-height: 20px;
  width: 100%;
`
