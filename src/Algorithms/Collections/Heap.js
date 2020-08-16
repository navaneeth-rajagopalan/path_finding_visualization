import HeapNode from './HeapNode.js';

class Heap {
    constructor() {
        this.heap = [];
    }

    getSize = () => {
        return this.heap.length;
    }

    isEmpty = () => {
        return this.getSize() === 0;
    }

    insert = (newItem) => {
        if((newItem instanceof HeapNode) && newItem.priority !== undefined){
            this.heap.push(newItem);
            this.bubbleUp();
        }else{
            throw 'Invalid heap entry: heapy entry has to be of type HeapNode';
        }        
    }

    poll = () => {
        if(this.getSize() > 0){
            this.swapItems(0, this.getSize() - 1);
            const polled = this.heap.pop();
            this.bubbleDown();
            return polled;
        }
        throw 'Invalid operation: Cannot poll an empty heap';
    }

    getParentIndex = (childIndex) => {
        const parentIndex = parseInt((childIndex - 1 ) / 2);
        return parentIndex;
    }

    getChildIndices = (parentIndex) => {
        const leftChildIndex = (parentIndex * 2) + 1;
        const rightChildIndex = (parentIndex * 2) + 2;
        return [leftChildIndex, rightChildIndex];
    }

    swapItems = (indexA, indexB) => {
        let temp = this.heap[indexA];
        this.heap[indexA] = this.heap[indexB];
        this.heap[indexB] = temp;
    }

    bubbleUp = () => {
        let index = this.getSize() - 1;
        let parentIndex = this.getParentIndex(index);
        while (index > 0 && this.heap[index].priority < this.heap[parentIndex].priority){
            this.swapItems(index, parentIndex);
            index = parentIndex;
            parentIndex = this.getParentIndex(index);
        }
    }

    bubbleDown = () => {
        let index = 0;
        let [leftChildIndex, rightChildIndex] = this.getChildIndices(index);
        while(leftChildIndex < this.getSize() && rightChildIndex < this.getSize()){
            if(this.heap[index].priority > this.heap[leftChildIndex].priority || this.heap[index].priority > this.heap[rightChildIndex].priority){
                let swapIndex = rightChildIndex;
                if(this.heap[leftChildIndex].priority < this.heap[rightChildIndex].priority){
                    swapIndex = leftChildIndex
                }
                this.swapItems(index, swapIndex);
                index = swapIndex;
                [leftChildIndex, rightChildIndex] = this.getChildIndices(index);
            }else{
                return;
            }
        }
        if(leftChildIndex < this.getSize()){
            if(this.heap[index].priority > this.heap[leftChildIndex].priority){
                this.swapItems(index, leftChildIndex);
            }
        }
    }
};

export default Heap;