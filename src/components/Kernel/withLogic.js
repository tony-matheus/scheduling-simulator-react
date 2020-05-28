import React from 'react'
import { connect } from 'react-redux'
import Process from '../../struct/Process'
import MemoryManager from '../../struct/MemoryManager'
import { message } from 'antd'
import Kernel from '.'
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

const withLogic = Component => withConnect(class extends React.Component { // class kernel
  constructor(props) {
    super(props)

    this.alertBarRef = React.createRef()

    this.state = {
      isDisableRandom: false,
      coreList: props.core.list,
      processList: props.process.list,
      terminatedProcessList: [],
      memoryManager: new MemoryManager(100)
      // MemoryManagerSinalized
    }
  }

  componentWillMount() {
    const interval = setInterval(() => {
      if ((Math.floor(Math.random() * 4) === 1) && !this.state.isDisableRandom) {
        message.success('Random Process Added')
        this.createProcess()
      }
    }, 3000)
    this.setState({
      randomInterval: interval
    })
  }

  nextProcess = (processList) => processList.find(process => process.state === 'ready')

  getProcess = (processList) => processList.find(process => process.state === 'ready')

  reOrderProcess = (processList, process) => {
    const index = processList.findIndex(p => {
      return p.id === process.id
    });
    processList.splice(index, 1)
    processList.push(process);
  }

  isCoreWorking = (coreList) => coreList.filter(core => core.status === 'busy')

  createProcess = () => {
    const process = new Process({
      id: this.state.processList.length,
      name: 'Process ' + (this.state.processList.length + this.state.terminatedProcessList.length + 1),
      state: 'ready',
    })
    return process
  }

  memoryAllocation = (requiredMemory) => {
    const { memoryManager} = this.state
    message.success(requiredMemory)
    memoryManager.malloc(requiredMemory)
    console.log(memoryManager)
    //     método que simula uma chamada de sistema por memória, tem como parâmetro um inteiro que representa a quantidade de memória
    // solicitada em bytes. Tem como retorno o endereço do bloco de memória que foi
    // usada para satisfazer a chamada.
  }

  free_memory = (memoryAddress) => {
    // call memory manager #free passing index of memory block
  }

  reOrderTimes = (processList) => {
    processList.sort(function (a, b) {
      if (a.totalTIme > b.totalTIme) {
        return 1;
      }
      if (a.totalTIme < b.totalTIme) {
        return -1;
      }
      return 0;
    });
  };

  changeIsDisableRandom = (value) => {
    message.info('Random Process ' + ((!value) ? 'Enabled' : 'Disabled'))
    this.setState({ isDisableRandom: value })
  }

  killProcess = id => {
    message.info(`Process ${id} Deleted`)
    this.setState({
      processList: this.state.processList.filter(proc => proc.id !== id)
    })
  }

  changeData = (data, callback = null ) => {
    this.setState(data, callback)
  }

  render() {
    return (<Component
      whichAlg={this.props.whichAlg}
      coreList={this.state.coreList}
      processList={this.state.processList}
      terminatedProcessList={this.state.terminatedProcessList}
      nextProcess={this.nextProcess}
      getProcess={this.getProcess}
      reOrderProcess={this.reOrderProcess}
      isCoreWorking={this.isCoreWorking}
      createProcess={this.createProcess}
      reOrderTimes={this.reOrderTimes}
      changeIsDisableRandom={this.changeIsDisableRandom}
      isDisableRandom={this.state.isDisableRandom}
      setIsDisableRandom={this.changeIsDisableRandom}
      changeData={this.changeData}
      memoryAllocation={this.memoryAllocation}
    />)
  }
})

export default withLogic
