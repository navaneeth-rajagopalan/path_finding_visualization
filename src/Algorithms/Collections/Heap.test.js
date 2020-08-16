import Heap from './Heap.js';
import HeapNode from './HeapNode.js';

const testHeap = new Heap();

const genRandInt = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
};

const insertToHeap = (value) => {
    testHeap.insert(new HeapNode(value));
};

const size = genRandInt(10, 150);

const testArray = [];

for (let index = 0; index < size; index++) {
    testArray.push(genRandInt(0, 10000));
}
let ptr = 0;

while(ptr < testArray.length || testHeap.getSize() > 0){
    let r = Math.random();
    if(r < 0.3 && testHeap.getSize() > 0){
        const heapVals = testHeap.heap.map(item => item.priority);
        const minVal = Math.min(...heapVals);
        const polled = testHeap.poll();
        if(minVal !== polled.priority){
            console.log("Test Failed");
            break;
        }
    }else{
        if(ptr < testArray.length){
            insertToHeap(testArray[ptr]);
            ptr += 1;
        }
    }
};

console.log("Test Passed");