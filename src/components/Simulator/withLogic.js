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

export default Component => withConnect(props => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  return(
    <Component 
      isDrawerVisible={isDrawerVisible} 
      setIsDrawerVisible={setIsDrawerVisible} 
    />
  )
})
