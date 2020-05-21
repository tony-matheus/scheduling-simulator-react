import React from 'react'
import { connect } from 'react-redux'
import { totalInstalledMemory } from '../../utils/constants'
import { message } from 'antd'
const withConnect = Component => {
  const mapStateToProps = state => ({})
  const actions = {}

  return connect(
    mapStateToProps,
    actions
  )(Component)
}

const withLogic = Component => withConnect(class extends React.Component { // class kernel
  constructor(props) {
    super(props)

    this.alertBarRef = React.createRef()

    this.state = {
      memory: [],
      freeBlockList: 0,
      totalMemory: totalInstalledMemory,
      memoryOverHead: 0,
      availableMemory: 0,
      occupiedMemory: 0,
      // quick fit info
      statisticsTable​: [],
      quickFitFreeBlocks​: [],
      numberQuickLists​: 0,
      minimumAmountCalls​: 0
    }
  }

  malloc = () => {

  }

  free = () => {

  }

  updateMemoryOverHead = () => {
    this.setState({ memoryOverHead: 0 })
  }

  updateAvailableMemory = () => {
    this.setState({ availableMemory: 0 })
  }

  updateOccupiedMemory = () => {
    this.setState({ occupiedMemory: 0 })
  }

  checkFreeMemory = () => {

  }

  // Algorithms
  firstFit = () => {

  }
  bestFit = () => {

  }
  quickFit = () => {

  }

  setAllocationAlgorithm = () => this.props.memoryAlgorith

  render() {
    return (<Component />)
  }
})

export default withLogic
