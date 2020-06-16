class MemoryBlock {
  constructor ({ totalBlockSize, occupiedSize, blockId, nextFreeBlock, pid }) {
    this.totalBlockSize = totalBlockSize
    this.occupiedSize = occupiedSize
    this.blockId = blockId
    this.nextFreeBlock = nextFreeBlock
    this.pid = pid
  }

  acceptMemoryRequest = (requiredMemory) => (this.totalBlockSize >= requiredMemory && (this.totalBlockSize - this.occupiedSize ) >= requiredMemory)
  isEqualMemoryRequest = (requiredMemory) => (this.totalBlockSize === requiredMemory && (this.totalBlockSize - this.occupiedSize ) === requiredMemory)
}

export default MemoryBlock
