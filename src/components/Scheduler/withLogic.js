import React from 'react'
import { connect } from 'react-redux'
import Process from '../../struct/Process'

const withConnect = Component => {
  const mapStateToProps = state => (
    {
      core: state.core,
      process: state.process,
      simulator: state.process,
    })
  const actions = {}

  return connect(
    mapStateToProps,
    actions
  )(Component)
}

const withLogic = Component => withConnect(class extends React.Component {
  constructor(props) {
    super(props)

    this.alertBarRef = React.createRef()

    this.state = {
      coreList: props.core.list,
      processList: props.process.list,
      terminatedProcessList: []
    }
  }

  componentWillMount() {
    this.roundRobin()
  }

  roundRobin = () => {

    setTimeout(() => {
      let coreList = this.state.coreList
      let processList = this.state.processList
      let terminatedProcessList = this.state.terminatedProcessList

      console.log(coreList[0].processInExecution.id)
      console.log(coreList[0].processInExecution.remainingTime)
      coreList.forEach((core, index) => {
        if (core.status === 'waiting' && this.nextProcess(processList)) {
          core.status = 'busy'
          if (core.processInExecution === 'none') {
            core.processInExecution = this.getProcess(processList)
            core.processInExecution.state = 'running'
          }
        } else if (core.processTimeLeft === 0 || core.processInExecution.remainingTime <= 0) {
          if (core.processInExecution.remainingTime <= 0) {
            core.processInExecution.state = 'terminated'
            const index = processList.findIndex(p => {
              return p.id === core.processInExecution.id
            });
            processList.splice(index, 1)
            terminatedProcessList.push(core.processInExecution)
          } else {
            core.processInExecution.state = 'ready'
          }
          this.reOrderProcess(processList, core.processInExecution)
          core.status = 'waiting'
          core.processInExecution = 'none'
          core.processTimeLeft = core.quantum
        } else if(core.processInExecution !== 'none')  {
          core.processInExecution.remainingTime -= 1
          core.processTimeLeft -= 1
        }
      })

      if (this.isSimulatorFinish(processList).length) {
        this.setState({
          coreList,
          processList,
          terminatedProcessList
        }, this.roundRobin)
      } else {
        this.setState({
          coreList,
          processList,
          terminatedProcessList
        })
        console.log(processList)
        console.log(terminatedProcessList)
        console.log('para')
      }

    }, 1000)
  }

  nextProcess = (processList) => processList.find(process => process.state === 'ready')

  getProcess = (processList) => {
    const process = processList.find(process => process.state === 'ready')
    // const index = processList.findIndex(p => p.id === process.id );
    // processList.splice(index, 1)
    return process
  }

  reOrderProcess = (processList, process) => {
    const index = processList.findIndex(p => {
      return p.id === process.id
    });
    processList.splice(index, 1)
    // if(process.remainingTime === 0)
    // finalizedProcess.push(process)
    // else
    processList.push(process);
  }

  isSimulatorFinish = (processList) => {
    const log = processList.filter(p => p.state !== 'terminated')
    console.log(log)
    return log
  }

  addNewProcess = () => {
    const process = new Process({
      id: this.state.processList.length,
      name: 'Process ' + this.state.processList.length,
      state: 'ready',
    })

    this.setState({
      processList: [
        ...this.state.processList,
        process
      ]
    })
  }
  
  render() {
    return (
      <Component
        coreList={this.state.coreList}
        processList={this.state.processList.filter(p => p.state !== 'terminated')}
        terminatedList={this.state.terminatedProcessList}
      />
    )
  }
})

export default withLogic
