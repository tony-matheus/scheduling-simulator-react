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
    const randNumber = this.randIntTime()
    this.totalTIme = randNumber
    this.remainingTime = randNumber
    // this.totalTIme = 5
    // this.remainingTime = 5
    this.totalMemoryUsed = 0
    this.memoryPointers = []
    this.callback = null
    this.clearCallback = null
  }

  randIntTime = (min = 1, max = 12) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
    // return Math.pow(2, Math.floor(Math.random() * (max - min) + min));

  }

  generateRandomStaticMemoryCall = (callback = '', clearCallback = '') => {
    this.totalMemoryUsed = this.randIntTime(1, 400)
    this.callback = callback
    this.clearCallback = clearCallback
    const memoryPointer = this.callback(this.totalMemoryUsed, `p_${this.id}`)
    if (memoryPointer || memoryPointer === 0) {
      this.memoryPointers.push(memoryPointer)
      // this.generateRandomDynamicMemoryCall()
      return true
    } else {
      return false
    }

  }
  generateRandomDynamicMemoryCall = () => {
    setInterval(() => {
      // if ((Math.floor(Math.random() * 4) === 1)) {
      this.totalMemoryUsed = this.randIntTime(100, 400)
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
