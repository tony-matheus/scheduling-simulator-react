class MemoryBlock {
  constructor ({ totalBlockSize, occupiedSize, blockId, nextFreeBlock }) {
    this.totalBlockSize = totalBlockSize
    this.occupiedSize = occupiedSize
    this.blockId = blockId
    this.nextFreeBlock = nextFreeBlock
  }

  acceptMemoryRequest = (requiredMemory) => (this.totalBlockSize >= requiredMemory && (this.totalBlockSize - this.occupiedSize ) >= requiredMemory)
}

export default MemoryBlock
