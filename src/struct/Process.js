class Process {
  constructor({
    id,
    name,
    state,
    processInExecution,
    remainingTime,
  }){
    this.id = id
    this.name = name
    this.processInExecution = processInExecution
    this.state = state // ready running terminated
    const randNumber = this.randIntTime()
    this.totalTIme = randNumber 
    this.remainingTime = randNumber
  }

  randIntTime = (min =1 , max = 20) => {
    return Math.floor(Math.random() * (max-min+1) + min);
  }
}

export default Process
