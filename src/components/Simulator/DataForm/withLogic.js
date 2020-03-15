import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addList as addCoreList } from '../../../redux/actions/core'
import { addList as addProcessList } from '../../../redux/actions/process'

const withConnect = Component => {
  const actions = {
    addCoreList,
    addProcessList
  }
  return connect(
    null,
    actions
  )(Component)
}

const initialState = {
  whichAlg: 'Round Robin',
  quantum: 4,
  coresNumber: 3,
  processesNumber: 10
}

export default Component => withConnect(props => {
  const [state, setState] = useState(initialState)

  const handleSelectAlg = (value, option) => {
    setState({
      ...state,
      [option.props.name]: value
    })
    props.changeWhichAlg(value)
  }

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleClose = () => {
    handleClear()
    props.closeDrawer()
  }

  const handleClear = () => {
    setState(initialState)
  }

  const handleStartSimulation = () => {
    props.addCoreList(Number(state.coresNumber), state.whichAlg, state.quantum)
    props.addProcessList(Number(state.processesNumber))
    handleClose()
  }

  return (
    <Component
      state={state}
      setState={setState}
      onSelectAlg={handleSelectAlg}
      onChange={handleChange}
      onClose={handleClose}
      onClear={handleClear}
      onStartSimulation={handleStartSimulation}
    />
  )
})
