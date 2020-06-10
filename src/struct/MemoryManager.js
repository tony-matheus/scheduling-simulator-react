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
                return this.quickFit(requiredMemory)
            default:
                break;
        }
    }

    free = (memoryAddress) => {
        const usedMemory = this.memory[memoryAddress].occupiedSize
        this.removeMemoryInformation(usedMemory)
        this.memory[memoryAddress].occupiedSize = 0
        this.updateFirstFreeBlock()
        this.updateNextBlock()
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
        if (!this.checkFreeMemory(requiredMemory)) {
            return false
        }
        if (this.memory.length === 0) {
            return this.tryCreateMemoryBlock(requiredMemory)
        }
        if (this.freeBlockList || this.freeBlockList === 0) {
            const freeBlockIndex = this.checkFirstFreeMemory(requiredMemory)
            // console.error(freeBlockIndex)
            if (!freeBlockIndex && freeBlockIndex !== 0) {
                return this.tryCreateMemoryBlock(requiredMemory)
            }

            return this.updateFreeBlock(freeBlockIndex, requiredMemory)
        }

        return this.tryCreateMemoryBlock(requiredMemory)
    }

    checkFirstFreeMemory = (requiredMemory, index = this.freeBlockList) => {
        // console.log(index)
        if (this.memory[index].acceptMemoryRequest(requiredMemory))
            return index

        if (this.memory[index].nextFreeBlock)
            return this.checkFirstFreeMemory(requiredMemory, this.memory[index].nextFreeBlock)

        return false
    }

    bestFit = (requiredMemory) => {
        if (!this.checkFreeMemory(requiredMemory)) {
            return false
        }
        if (this.memory.length === 0) {
            return this.tryCreateMemoryBlock(requiredMemory)
        }
        if (this.freeBlockList || this.freeBlockList === 0) {
            const freeBlockIndex = this.checkBestFreeMemory(requiredMemory, -1)
            console.log(freeBlockIndex);
            if (!freeBlockIndex && freeBlockIndex !== 0) {
                return this.tryCreateMemoryBlock(requiredMemory)
            }

            return this.updateFreeBlock(freeBlockIndex, requiredMemory)
        }

        return this.tryCreateMemoryBlock(requiredMemory)
    }

    checkBestFreeMemory = (requiredMemory, bestIndex, index = this.freeBlockList) => {
        // console.log(index)
        // console.log(bestIndex)
        if (this.memory[index].acceptMemoryRequest(requiredMemory)) {
            if (bestIndex === -1) {
                bestIndex = index;
            } else if (this.memory[index].totalBlockSize - requiredMemory < this.memory[bestIndex].totalBlockSize - requiredMemory) {
                bestIndex = index;
            }
            if (this.memory[index].nextFreeBlock)
                return this.checkBestFreeMemory(requiredMemory, bestIndex, this.memory[index].nextFreeBlock)
            return bestIndex;
        }
        if (this.memory[index].nextFreeBlock)
            return this.checkBestFreeMemory(requiredMemory, bestIndex, this.memory[index].nextFreeBlock)

        return false
    }

    quickFit = (requiredMemory) => {
        if (this.minimumAmountCalls <= 10) {
            if (this.statisticTable.length === 0) this.statisticTable.push({requiredMemory: requiredMemory, occurrences: 1})
            for (let count = 0; count < this.statisticTable.length; count++) {
                if (this.statisticTable[count].requiredMemory === requiredMemory) {
                    this.statisticTable[count].occurrences += 1;
                }
            }

            this.minimumAmountCalls = this.statisticTable.length;
            console.log(this.minimumAmountCalls);
            console.log(this.statisticTable);
            return this.firstFit(requiredMemory);
        }
        // quick fit em si

    }

    tryCreateMemoryBlock = (requiredMemory) => {
        if (!this.checkCanCreateNewBlock(requiredMemory)) {
            return false
        }

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

    updateFreeBlock = (freeBlockIndex, requiredMemory) => {
        if ((this.memory[freeBlockIndex].occupiedSize + requiredMemory) > this.memory[freeBlockIndex].totalBlockSize) {
            return false
        }
        this.memory[freeBlockIndex].occupiedSize += requiredMemory
        const nextFreeblock = this.memory[freeBlockIndex].nextFreeBlock
        if (nextFreeblock || nextFreeblock === 0) {
            debugger
            this.freeBlockList = nextFreeblock
        }
        this.memory[freeBlockIndex].nextFreeBlock = null
        this.addMemoryInformation(requiredMemory)

        return freeBlockIndex
    }
    // qual a diferença entre occupied memory and memoryOverHead

    updateFirstFreeBlock = () => {
        // let freeBlock = null
        this.memory.map((memoryBlock, index) => {
            if (!this.freeBlockList && this.freeBlockList !== 0 && memoryBlock.occupiedSize === 0) {
                debugger
                this.freeBlockList = index
            }
        })
        // this.freeBlockList = freeBlock
    }

    updateNextBlock = () => {
        const freeBlocksList = this.memory.filter(memoryblock => memoryblock.occupiedSize === 0)
        if (freeBlocksList.length >= 2) {
            freeBlocksList.map((freeBlock, index) => {
                if (index < freeBlocksList.length - 1) {
                    this.memory[freeBlock.blockId].nextFreeBlock = freeBlocksList[index + 1].blockId
                }
            })
        }
        debugger
        this.freeBlockList = freeBlocksList[0].blockId
    }

}

export default MemoryManager
