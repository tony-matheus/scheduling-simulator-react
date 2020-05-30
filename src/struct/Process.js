class Process {
  constructor({
    id,
    name,
    state,
    processInExecution,
    remainingTime,
    totalMemoryUsed,
  }){
    this.id = id
    this.name = name
    this.processInExecution = processInExecution
    this.state = state // ready running terminated
    const randNumber = this.randIntTime()
    this.totalTIme = randNumber
    this.remainingTime = randNumber
    this.totalMemoryUsed = totalMemoryUsed
    this.memoryPointers = []
  }

  randIntTime = (min = 1 , max = 20) => {
    return Math.floor(Math.random() * (max-min+1) + min);
  }

  generateRandomStaticMemoryCall = (callback = '') => {
    this.totalMemoryUsed = this.randIntTime(1, 30)
    callback(this.totalMemoryUsed)
  }
  generateRandomDynamicMemoryCall = () => {

  }
}

export default Process
