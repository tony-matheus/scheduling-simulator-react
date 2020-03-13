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
  const [isDrawerVisible, setIsDrawerVisible] = useState(true);
  const coreList = useSelector(state => state.core.list)

  return(
    <Component 
      isDrawerVisible={isDrawerVisible} 
      setIsDrawerVisible={setIsDrawerVisible} 
      showScheduler={(coreList.length > 0)}
    />
  )
})
