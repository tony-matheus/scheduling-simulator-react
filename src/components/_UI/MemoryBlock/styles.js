import styled from 'styled-components/macro'
import theme from '../../../utils/theme'

export const Container = styled.div`
  /* width: ${({ size }) => `${(size || '10')}%;`}; */
  background-color: ${theme.dark.black};
  border-radius: 2px;
  margin-botton: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 14px;
  text-align: center;
  /* min-width: 90px; */
  width: 160px;

  & > *:not(:last-child){
    ${({ status }) => {
      switch (status) {
        case 'waiting':
          return `border-bottom: 1px solid ${theme.dark.yellow};`
        case 'busy':
          return `border-bottom: 1px solid ${theme.dark.red};`
        default:
          return `border-bottom: 1px solid ${theme.dark.red};`
      }
    }}
  }
`

export const StatusBar = styled.div`
  ${({ status }) => {
    switch (status) {
      case 'free':
        return `background-color: ${theme.dark.green};`
      case 'busy':
        return `background-color: ${theme.dark.red};`
      default:
        return `background-color: ${theme.dark.green};`
    }
  }}
  width: 5%;
  height: 100%;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 ${({ size }) => `${(size / 4 || '30')}%`};

  & > *:not(:last-child){
    padding-top: 14px;
    padding-bottom: 14px;
    ${({ status }) => {
      switch (status) {
        case 'waiting':
          return `border-bottom: 1px solid ${theme.dark.yellow};`
        case 'busy':
          return `border-bottom: 1px solid ${theme.dark.red};`
        default:
          return `border-bottom: 1px solid ${theme.dark.red};`
      }
    }}
  }
`

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  font-size: 12px;
  line-height: 14px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: white;
  color: ${theme.dark.green};
`

export const SubTitle = styled(Title)`
  color: white !important;
`

export const StatusText = styled(Title)`
  font-size: ${8 + (8 * 0.5)}px;
  line-height: ${10 + (10 * 0.5)}px;
`

export const BottomWrapper = styled.div`
  display: flex;
  padding: 6px 0;
  justify-content: space-between;
`

export const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;

  ${({ status, isRight }) => {
    if (isRight) {
      switch (status) {
        case 'waiting':
          return `border-left: 1px solid ${theme.dark.yellow};`
        case 'busy':
          return `border-left: 1px solid ${theme.dark.red};`
        default:
          return `border-left: 1px solid ${theme.dark.green};`
      }
    }
  }}
`

export const TimeText = styled(Title)`
  font-size: 12px;
  /* line-height: 6px; */
`

export const TimeCount = styled(TimeText)`
  font-size: 16px;
  /* line-height: 20px; */
  width: 100%;
`

export const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: right !important;

  & > div:not(:last-child){
    & span {
      text-align: left !important;
    }
  }
`
