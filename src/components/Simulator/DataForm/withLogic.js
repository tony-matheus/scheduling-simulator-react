import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
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
  coresNumber: 0,
  processesNumber: 0
}

export default Component => withConnect(props => {
  const [state, setState] = useState(initialState);

  const handleSelectAlg = (value, option) => {
    setState({
      ...state,
      [option.props.name]: value
    });
  }

  const handleChange = (e) => {
    console.clear()
    console.log(e.target.name, e.target.value)
    setState({
      ...state,
      [e.target.name]: e.target.value
    })

    console.log(state)
  }

  const handleClose = () => {
    console.log(props)
    handleClear()
  }

  const handleClear = () => {
    setState(initialState)
  }

  const handleStartSimulation = () => {
    console.log(state.coresNumber, state.processesNumber)
    props.addCoreList(Number(state.coresNumber), state.whichAlg)
    props.addProcessList(Number(state.processesNumber))
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
