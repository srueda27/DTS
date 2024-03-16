"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function longestSubarray(nums, limit) {
    // Given an array of integers nums and an integer limit, 
    // return the size of the longest non-empty subarray 
    // such that the absolute difference between any two elements of this subarray is less than or equal to limit.
    let increasing = [];
    let decreasing = [];
    let left = 0, ans = 0;
    for (let right = 0; right < nums.length; right++) {
        // maintain the monotonic deques
        // increasing stack
        while (increasing.length && increasing[increasing.length - 1] > nums[right]) {
            increasing.pop();
        }
        // decreasing stack
        while (decreasing.length && decreasing[decreasing.length - 1] < nums[right]) {
            decreasing.pop();
        }
        increasing.push(nums[right]);
        decreasing.push(nums[right]);
        // maintain window property
        while (decreasing[0] - increasing[0] > limit) {
            if (nums[left] == decreasing[0]) {
                decreasing.shift();
            }
            if (nums[left] == increasing[0]) {
                increasing.shift();
            }
            left++;
        }
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
}
exports.default = longestSubarray;
;
// console.log(longestSubarray([10, 1, 2, 4, 7, 2, 8], 5))
// console.log(maxDistance([55, 30, 5, 4, 2], [100, 20, 10, 10, 5]))
// console.log(maxDistance([2, 2, 2], [10, 10, 1]))
// console.log(maxDistance([30, 29, 19, 5], [25, 25, 25, 25, 25]))
// console.log(successfulPairs([5, 1, 3], [1, 2, 3, 4, 5], 7))
/*
[
  //  [0,1,2,3,4,5,6,7,8]
      [1,0,0,0,0,0,0,0,0]
      [0,1,0,1,0,0,0,1,0]
      [0,0,1,0,1,0,0,0,0]
      [0,1,0,1,0,0,0,0,0]
      [0,0,1,0,1,0,0,0,0]
      [0,0,0,0,0,1,1,0,0]
      [0,0,0,0,0,1,1,0,0]
      [0,1,0,0,0,0,0,1,0]
]
*/
const ab = [
    //  [0,1,2,3,4,5,6,7,8]
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0]
];
// Each iteration of the while loop pops an element from the stack,
// and each element can only be pushed to the stack once.
// Thus, the while loop never runs more than n times in total.
// Los divisores de un número - MCM
const findDivisorsSum = (num) => {
    let sum = 1; // Start with 1, since it's a divisor for all numbers
    if (num === 1)
        return 1; // Handle the case for 1 explicitly
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            sum += i;
            let correspondingDivisor = num / i;
            if (i !== correspondingDivisor) { // Avoid adding the square root twice for perfect squares
                sum += correspondingDivisor;
            }
        }
    }
    return sum + num; // Add the number itself to its divisors sum
};
