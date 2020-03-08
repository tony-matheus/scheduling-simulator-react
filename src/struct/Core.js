class Core {
  constructor({
    id,
    name,
    status,
    processInExecution,
    processTimeLeft,
    quantum
  }){
    this.id = id
    this.name = name
    this.status = status
    this.processInExecution = processInExecution
    this.processTimeLeft = processTimeLeft
    this.quantum = quantum
  }
}

export default Core
