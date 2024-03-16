// Tecnica para un arreglo de números
// Given an array nums,
// prefix = [nums[0]]
// for (int i = 1; i < nums.length; i++)
//     prefix.append(nums[i] + prefix[prefix.length - 1])
// If we want the sum of the subarray from i to j (inclusive), 
// then the answer is prefix[j] - prefix[i] + nums[i].
function answerQueries(nums, queries, limit) {
    let prefix = [nums[0]];
    for (let i = 1; i < nums.length; i++) {
        prefix.push(nums[i] + prefix[prefix.length - 1]);
    }
    let result = [];
    for (let i = 0; i < queries.length; i++) {
        let x = queries[i][0];
        let y = queries[i][1];
        result.push(prefix[y] - prefix[x] + nums[x] < limit);
    }
    console.log(result);
    return result;
}
;
answerQueries([1, 6, 3, 2, 7, 2], [[0, 3], [2, 5], [2, 4]], 13);
function waysToSplitArray(nums) {
    let prefix = [nums[0]];
    for (let i = 1; i < nums.length; i++) {
        prefix.push(nums[i] + prefix[prefix.length - 1]);
    }
    let result = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        if (prefix[i] >= prefix[nums.length - 1] - prefix[i])
            result++;
    }
    return result;
}
;
waysToSplitArray([10, 4, -8, 7]);
function getAverages(nums, k) {
    if (nums.length - 1 - k < k)
        return [-1];
    let prefix = [nums[0]];
    for (let i = 1; i < nums.length; i++) {
        prefix.push(nums[i] + prefix[prefix.length - 1]);
    }
    let resul = [];
    for (let i = 0; i < k; i++) {
        resul.push(-1);
    }
    for (let i = k; i < nums.length - k; i++) {
        let total = prefix[i + k] - prefix[i - k] + nums[i - k];
        resul.push(Math.floor(total / (k * 2 + 1)));
    }
    for (let i = 0; i < k; i++) {
        resul.push(-1);
    }
    return resul;
}
;
getAverages([7, 4, 3, 9, 1, 8, 5, 2, 6], 3);
