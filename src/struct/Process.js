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
    // this.totalTIme = randNumber
    // this.remainingTime = randNumber
    this.totalTIme = 3
    this.remainingTime = 3
    this.totalMemoryUsed = 0
    this.memoryPointers = []
  }

  randIntTime = (min = 1 , max = 20) => {
    return Math.floor(Math.random() * (max-min+1) + min);
  }

  generateRandomStaticMemoryCall = (callback = '') => {
    this.totalMemoryUsed = this.randIntTime(100, 400)
    const memoryPointer = callback(this.totalMemoryUsed)
    if(memoryPointer || memoryPointer === 0){
      this.memoryPointers.push(memoryPointer)
      return true
    }else{
      return false
    }

  }
  generateRandomDynamicMemoryCall = () => {

  }
}

export default Process
