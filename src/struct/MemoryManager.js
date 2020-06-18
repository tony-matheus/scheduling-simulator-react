import MemoryBlock from './MemoryBlock'

class MemoryManager {
    constructor({
                    totalInstalledMemory,
                    memoryAllocationAlg,
                    numberQuickList,
                    numberMemoryCalls
                }) {
        this.memory = []
        this.freeBlockList = null
        this.totalMemory = totalInstalledMemory
        this.memoryOverHead = 0
        this.availableMemory = totalInstalledMemory
        this.occupiedMemory = 0
        this.memoryAlgorith = memoryAllocationAlg
        this.actualPid = ''
        // quick fit info
        this.statisticTable = []
        this.quickFitFreeBlocks = []
        this.numberQuickLists = numberQuickList
        this.minimumAmountCalls = numberMemoryCalls
        this.counterCalls = 0
    }

    malloc = (requiredMemory, pid) => {
        debugger
        this.actualPid = pid
        switch (this.memoryAlgorith.toLowerCase()) {
            case 'first fit':
                return this.firstFit(requiredMemory)
            case 'best fit':
                return this.bestFit(requiredMemory)
            case 'quick fit':
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
        if (this.memory[index].acceptMemoryRequest(requiredMemory) && this.memory[index].occupiedSize === 0)
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
        if (this.memory[index].acceptMemoryRequest(requiredMemory) && this.memory[index].occupiedSize === 0) {
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
        this.counterCalls += 1;
        if (!this.checkFreeMemory(requiredMemory)) {
            return false
        }
        if (this.counterCalls <= this.minimumAmountCalls) {
            if (this.statisticTable.length === 0) this.statisticTable.push({
                requiredMemory: requiredMemory,
                occurrences: 0
            });
            let flag = 0;
            for (let count = 0; count < this.statisticTable.length; count++) {
                if (this.statisticTable[count].requiredMemory === requiredMemory) {
                    this.statisticTable[count].occurrences += 1;
                    flag = 1;
                    break;
                }
            }
            if (flag !== 1) {
                this.statisticTable.push({requiredMemory: requiredMemory, occurrences: 1});
            }
            return this.firstFit(requiredMemory);
        } else {
            // quick fit em si
            let statisticTableByOccurrences = this.statisticTable.slice(0);
            statisticTableByOccurrences.sort(function (a, b) {
                return b.occurrences - a.occurrences;
            });

            if (this.numberQuickLists > 11 || this.numberQuickLists === undefined || this.numberQuickLists === 0){
                (this.numberQuickLists > this.statisticTable.length) ? this.numberQuickLists = this.statisticTable.length : this.numberQuickLists = 3;
            }

            let lists = statisticTableByOccurrences.splice(0, this.numberQuickLists);

            console.log(lists);

            if (this.freeBlockList || this.freeBlockList === 0) {
                const freeBlockIndex = this.checkBlockSizeList(requiredMemory, lists,0)
                // console.log(freeBlockIndex);
                if (!freeBlockIndex && freeBlockIndex !== 0) {
                    return this.tryCreateMemoryBlock(requiredMemory)
                }

                return this.updateFreeBlock(freeBlockIndex, requiredMemory)
            }

            return this.tryCreateMemoryBlock(requiredMemory)
        }
    }

    checkBlockSizeList = (requiredMemory, lists, flag, index = this.freeBlockList) => {
        for (let count = 0; count < this.numberQuickLists; count++) {
            if (lists[count].requiredMemory === requiredMemory) { // lista - 4 \ req - 4
                if (this.memory[index].isEqualMemoryRequest(requiredMemory) && this.memory[index].occupiedSize === 0) { // req = tamanho do bloco ?
                    return index;
                }
                if (this.memory[index].nextFreeBlock)
                    return this.checkBlockSizeList(requiredMemory, lists, 1, this.memory[index].nextFreeBlock)
            }
        }
        if(flag === 0) {
            for (let positionOfMemory = 0; positionOfMemory < this.memory.length; positionOfMemory++) {
                for (let numberOfList = 0; numberOfList < this.numberQuickLists; numberOfList++) {
                    if (this.memory[positionOfMemory].acceptMemoryRequest(requiredMemory) &&
                        this.memory[positionOfMemory].totalBlockSize !== lists[numberOfList].requiredMemory &&
                        this.memory[positionOfMemory].occupiedSize === 0)
                        return positionOfMemory
                }
            }
        }

        return false
    }

    tryCreateMemoryBlock = (requiredMemory) => {
        if (!this.checkCanCreateNewBlock(requiredMemory)) {
            return false
        }

        const memoryBlock = new MemoryBlock({
            totalBlockSize: requiredMemory,
            occupiedSize: requiredMemory,
            blockId: this.memory.length,
            nextFreeBlock: null,
            pid: this.actualPid
        })
        this.actualPid = ''
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
            this.freeBlockList = nextFreeblock
        }
        this.memory[freeBlockIndex].nextFreeBlock = null
        this.memory[freeBlockIndex].pid = this.actualPid
        this.addMemoryInformation(requiredMemory)

        return freeBlockIndex
    }
    // qual a diferença entre occupied memory and memoryOverHead

    updateFirstFreeBlock = () => {
        // let freeBlock = null
        this.memory.map((memoryBlock, index) => {
            if (!this.freeBlockList && this.freeBlockList !== 0 && memoryBlock.occupiedSize === 0) {
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
        this.freeBlockList = freeBlocksList[0].blockId
    }

}

export default MemoryManager
