import MemoryBlock from './MemoryBlock'

class MemoryManager {
  constructor(totalInstalledMemory) {
    this.memory = [
      new MemoryBlock({
        totalBlockSize: 40,
        occupiedSize: 0,
        blockId: 0,
        nextFreeBlock: 1
      }),
      new MemoryBlock({
        totalBlockSize: 30,
        occupiedSize: 0,
        blockId: 1,
        nextFreeBlock: null
      }),
    ]
    this.freeBlockList = 0
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
        return this.firstFit(requiredMemory)
      default:
        break;
    }
  }

  free = (memoryAddress) => {
    const usedMemory = this.memory[memoryAddress].occupiedSize
    this.removeMemoryInformation(usedMemory)
    this.memory[memoryAddress].occupiedSize = 0
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

    if (this.freeBlockList || this.freeBlockList === 0) {
      const freeBlockIndex = this.checkFirstFreeMemory(requiredMemory)
      if (!freeBlockIndex && freeBlockIndex !== 0) {
        return this.createMemoryBlock(requiredMemory)
      }

      return this.updateFreeBlock(freeBlockIndex, requiredMemory)
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
    if(!this.checkCanCreateNewBlock(requiredMemory)) { return false }

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
    this.totalMemory > (this.memory.reduce((sum, memory) => sum + memory.totalBlockSize, 0) + requiredMemory)

  addMemoryInformation = (requiredMemory) => {
    this.memoryOverHead += requiredMemory
    this.occupiedMemory += requiredMemory
    this.availableMemory = this.totalMemory - this.memoryOverHead
  }

  removeMemoryInformation = (usedMemory) => {
    this.memoryOverHead -= usedMemory
    this.occupiedMemory -= usedMemory
    this.availableMemory += usedMemory
  }

  updateFreeBlock = ( freeBlockIndex, requiredMemory ) => {
    if((this.memory[freeBlockIndex].occupiedSize + requiredMemory) > this.memory[freeBlockIndex].totalBlockSize) { return false}
    this.memory[freeBlockIndex].occupiedSize += requiredMemory
    this.freeBlockList = this.memory[freeBlockIndex].nextFreeBlock
    this.addMemoryInformation(requiredMemory)

    return freeBlockIndex
  }
  // qual a diferença entre occupied memory and memoryOverHead

}

export default MemoryManager
