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

  randIntTime = (min = 1 , max = 12) => {
    // return Math.floor(Math.random() * (max-min+1) + min);
  return Math.pow(2,Math.floor(Math.random() * (max - min) + min));

  }

  generateRandomStaticMemoryCall = (callback = '') => {
    this.totalMemoryUsed = this.randIntTime(1, 12)
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
