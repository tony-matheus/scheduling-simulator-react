import MemoryBlock from './MemoryBlock'

class MemoryManager {
  constructor(totalInstalledMemory) {
    this.memory = []
    this.freeBlockList = null
    this.totalMemory = totalInstalledMemory
    this.memoryOverHead = 0
    this.availableMemory = totalInstalledMemory
    this.occupiedMemory = 0
    this.memoryAlgorith = 'First Fit'

    // quick fit info
    this.statisticTable = []
    this.quickFitFreeBlocks = []
    this.numberQuickLists = 0
    this.minimumAmountCalls = 0
  }
  malloc = (requiredMemory) => {
    switch (this.memoryAlgorith) {
      case 'First Fit':
        return console.log(this.firstFit(requiredMemory), 'malloc')

      default:
        break;
    }
  }

  free = () => {

  }

  updateMemoryOverHead = () => {
    this.memoryOverHead = 0
  }

  updateAvailableMemory = () => {
    this.availableMemory = 0
  }

  updateOccupiedMemory = () => {
    this.occupiedMemory = 0
  }

  checkFreeMemory = (requiredMemory) => this.availableMemory >= requiredMemory

  // Algorithms
  firstFit = (requiredMemory) => {
    console.log(requiredMemory, 'Memory Manager')
    if (!this.checkFreeMemory(requiredMemory)) { return false }

    if (this.memory.length === 0) {
      return this.createMemoryBlock(requiredMemory)
    }

    if (this.freeBlockList) {
      const freeBlock = this.checkFirstFreeMemory(requiredMemory)
      if (!freeBlock) {
        return this.createMemoryBlock(requiredMemory)
      }
      return freeBlock
    }

    return this.createMemoryBlock(requiredMemory)
  }

  checkFirstFreeMemory = (requiredMemory, index = this.freeBlockList) => {
    if (this.memory[index].acceptMemoryRequest(requiredMemory))
      return index

    if (this.memory[index].nextFreeBlock)
      return this.checkFirstFreeMemory(requiredMemory, this.memory[index].nextFreeBlock)

    return false
  }

  bestFit = () => {

  }
  quickFit = () => {

  }

  createMemoryBlock = (requiredMemory) => {
    if(!this.checkCanCreateNewBlock(requiredMemory)) { return 'n deu pra criar oh' }

    const memoryBlock = new MemoryBlock({
      totalBlockSize: requiredMemory,
      occupiedSize: requiredMemory,
      blockId: this.memory.length,
      nextFreeBlock: null
    })
    this.memory.push(memoryBlock)
    this.addMemoryInformation(requiredMemory)
    return this.memory.length - 1

  }

  checkCanCreateNewBlock = (requiredMemory) =>
    this.totalMemory > (this.memory.reduce((memory, sum) => sum + memory.totalBlockSize, 0) + requiredMemory)

  addMemoryInformation = (requiredMemory) => {
    this.memoryOverHead += requiredMemory
    this.occupiedMemory += requiredMemory
    this.availableMemory = this.totalMemory - this.memoryOverHead
  }

  removeMemoryInformation = (requiredMemory) => {
    this.memoryOverHead -= requiredMemory
    this.occupiedMemory -= requiredMemory
    this.availableMemory += requiredMemory
  }

  // qual a diferença entre occupied memory and memoryOverHead

}

export default MemoryManager
