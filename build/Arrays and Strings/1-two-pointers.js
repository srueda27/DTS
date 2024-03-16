function left_right(arr) {
    let left = 0;
    let rigth = arr.length - 1;
    while (left < rigth) {
        // Do some logic here to decide on one of the following:
        // 1. left++
        // 2. rigth--
        // 3. left++ && rigth--
    }
}
function simultaneo(arr1, arr2) {
    let i = 0, j = 0;
    while (i < arr1.length && j < arr2.length) {
        // Do some logic here to decide on one of the following:
        // 1. i++
        // 2. j++
        // 3. i++ && j++
    }
    // Step 4: Terminar el arreglo faltante 
    // Sólo uno de estos dos whiles va a correr
    while (i < arr1.length) {
        // Do some logic here to decide on one of the following:
        // 1. i++
    }
    while (j < arr2.length) {
        // Do some logic here to decide on one of the following:
        // 1. j++
    }
}
function sortedSquares(nums) {
    let start = 0;
    let finish = nums.length - 1;
    let result = [];
    for (let i = nums.length - 1; i >= 0; i--) {
        if (Math.abs(nums[start]) < Math.abs(nums[finish])) {
            result[i] = nums[finish] * nums[finish];
            finish--;
        }
        else {
            result[i] = nums[start] * nums[start];
            start++;
        }
    }
    return result;
}
;
sortedSquares([-4, -1, 0, 3, 10]); //[0, 1, 9, 16, 100]
