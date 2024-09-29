const countingSort = (arr) => {
    const maxVal = Math.max(...arr);
    const countArr = new Array(maxVal + 1).fill(0);
  
    for (const val of arr) {
        countArr[val]++;
    }
  
    const sortedArr = [];
    for (let i = 0; i < countArr.length; i++) {
        for (let j = 0; j < countArr[i]; j++) {
            sortedArr.push(i);
        }
    }
  
    return sortedArr;
}

module.exports = countingSort