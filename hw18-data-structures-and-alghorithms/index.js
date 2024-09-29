const { BalancedBST } = require('./tree')
const countingSort = require('./sort')

const generateRandomData = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100000));
}

const measureComplexity = (algorithm, data) => {
    const startTime = process.hrtime.bigint();
    algorithm(data);
    const endTime = process.hrtime.bigint();
    const elapsedTime = (endTime - startTime);
    return Number(elapsedTime);
}

const sizeArray = [10, 50, 100, 200, 500, 800, 1000, 1500, 2000, 3000, 4000, 8000, 10000, 15000, 20000, 25000, 35000, 50000, 75000, 100000]
const bstInsertTimeArr = [] 
const bstFindTimeArr = []
const bstDeleteTimeArr = []
const countingSortTimeArr = []

for (const size of sizeArray) {
    const data = generateRandomData(size);
    const bst = new BalancedBST();

    const bstInsertTime = measureComplexity(() => bst.insert(data));
    const bstFindTime = measureComplexity(() => bst.find(Math.floor(Math.random() * 100000)));
    const bstDeleteTime = measureComplexity(() => bst.delete(Math.floor(Math.random() * 100000)));
    const countingSortTime = measureComplexity(() => countingSort(data));

    console.log(`Size: ${size}`);
    console.log(`BST Insert Time: ${bstInsertTime} nanoseconds`);
    console.log(`BST Find Time: ${bstFindTime} nanoseconds`);
    console.log(`BST Delete Time: ${bstDeleteTime} nanoseconds`);
    console.log(`Counting Sort Time: ${countingSortTime} nanoseconds`);
    console.log();

    bstInsertTimeArr.push(bstInsertTime)
    bstFindTimeArr.push(bstFindTime)
    bstDeleteTimeArr.push(bstDeleteTime)
    countingSortTimeArr.push(countingSortTime)
  // nanoseconds are 10^-9 seconds 
}

console.log(
    sizeArray,
    bstInsertTimeArr,
    bstFindTimeArr,
    bstDeleteTimeArr,
    countingSortTimeArr
)