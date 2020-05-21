class MemoryBlock {
  constructor ({ totalBlockSize, occupiedSize, blockAddress, nextFreeBlock }) {
    this.totalBlockSize = totalBlockSize
    this.occupiedSize = occupiedSize
    this.blockAddress = blockAddress
    this.nextFreeBlock = nextFreeBlock
  }
}

export default MemoryBlock
