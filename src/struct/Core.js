class Core {
  constructor({
    id,
    name,
    status,
    processInExecution,
    processTimeLeft,
  }){
    this.id = id
    this.name = name
    this.status = status
    this.processInExecution = processInExecution
    this.processTimeLeft = processTimeLeft
  }
}

export default Core
