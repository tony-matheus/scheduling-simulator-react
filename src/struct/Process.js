class Process {
  constructor({
    id,
    name,
    state,
    processInExecution,
    remainingTime,
    totalMemoryUsed,
  }) {
    this.id = id
    this.name = name
    this.processInExecution = processInExecution
    this.state = state // ready running terminated
    const randNumberTimer = this.randIntTime()
    this.totalTIme = randNumberTimer
    this.remainingTime = randNumberTimer
    // this.totalTIme = 1
    // this.remainingTime = 1
    this.totalMemoryUsed = 0
    this.memoryPointers = []
    this.callback = null
    this.clearCallback = null
  }

  randIntTime = (min = 1, max = 12) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randIntMemory = (min = 1, max = 12) => {
    // return Math.floor(Math.random() * (max - min + 1) + min);
    return Math.pow(2, Math.floor(Math.random() * (max - min) + min));

  }

  generateRandomStaticMemoryCall = (callback = '', clearCallback = '') => {
    // this.totalMemoryUsed = this.randIntTime(1, 400)
    const requestMemory = this.randIntMemory(1, 11)
    this.totalMemoryUsed += requestMemory
    this.callback = callback
    this.clearCallback = clearCallback
    const memoryPointer = this.callback(requestMemory, `p_${this.id}`)
    if (memoryPointer || memoryPointer === 0) {
      this.memoryPointers.push(memoryPointer)
      // this.generateRandomDynamicMemoryCall()
      return true
    }
    this.clearCallback(this.memoryPointers)
    this.memoryPointers = []
    return false
  }

  generateRandomDynamicMemoryCall = () => {
    setInterval(() => {
      // if ((Math.floor(Math.random() * 4) === 1)) {
      this.totalMemoryUsed = this.randIntMemory(1, 11)
      console.log('pediu mais')
      const memoryPointer = this.callback(1000, `p_${this.id}`)
      if (memoryPointer || memoryPointer === 0) {
        this.memoryPointers.push(memoryPointer)
      }else {
        this.clearCallback(this.memoryPointers)
      }
      // }
    }, 3000)
  }
}

export default Process
