import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useSelector, connect } from 'react-redux'

const withConnect = Component => {
  const actions = {
  }
  return connect(
    null,
    actions
  )(Component)
}

const initialState = {
  whichAlg: ''
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
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleClose = () => {
    console.log(props)
    handleClear()
  }

  const handleClear = () => {
    setState(initialState)
  }

  const handleStartSimulation = () => {
    
  }

  return (
    <Component
      state={state}
      setState={setState}
      onSelectAlg={handleSelectAlg}
      onChange={handleChange}
      onClose={handleClose}
      onClear={handleClear}
      onStartSimulatioe={handleStartSimulation}
    />
  )
})
