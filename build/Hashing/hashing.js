"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// numeros no ordenados
function twoSum(nums, target) {
    let dic = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (dic.has(target - nums[i])) {
            return [dic.get(target - nums[i]), i];
        }
        dic.set(nums[i], i);
    }
    return [-1, -1];
}
;
console.log(twoSum([2, 7, 11, 15], 9));
// /*************** */
function missingNumber(nums) {
    let numsSet = new Set(nums);
    for (let i = 0; i <= nums.length; i++) {
        if (!numsSet.has(i))
            return i;
    }
}
;
console.log(missingNumber([0, 1]));
// *************
function findWinners(matches) {
    let zeroLoss = new Set();
    let oneLosses = new Set();
    let moreLosses = new Set();
    for (const [winner, loser] of matches) {
        // Tratar al ganador
        if (!oneLosses.has(winner) && !moreLosses.has(winner)) {
            zeroLoss.add(winner);
        }
        // Tratar al perdedor
        if (zeroLoss.has(loser)) {
            zeroLoss.delete(loser);
            oneLosses.add(loser);
        }
        else if (oneLosses.has(loser)) {
            oneLosses.delete(loser);
            moreLosses.add(loser);
        }
        else if (moreLosses.has(loser)) {
            continue;
        }
        else {
            oneLosses.add(loser);
        }
    }
    let winners = Array.from(zeroLoss).sort((a, b) => a - b);
    let almostWinners = Array.from(oneLosses).sort((a, b) => a - b);
    return [winners, almostWinners];
}
exports.default = findWinners;
;
console.log(findWinners([[2, 3], [1, 3], [5, 4], [6, 4]]));
/* export default function findWinners(matches: number[][]): number[][] {
  let results = new Map()
  for (const [winner, loser] of matches) {
    const winnerData = results.get(winner) || [0, 0]
    const loserData = results.get(loser) || [0, 0]
    results.set(winner, [winnerData[0] + 1, winnerData[1]])
    results.set(loser, [loserData[0], loserData[1] + 1])
  }

  let winners: number[][] = [[], []]
  for (const [player, result] of results) {
    if (result[1] == 0) {
      winners[0].push(player)
    } else if (result[1] == 1) {
      winners[1].push(player)
    }
  }

  winners = [winners[0].sort((a, b) => a - b), winners[1].sort((a, b) => a - b)]
  return winners
}; */
//  *********************
function groupAnagrams(strs) {
    let strMap = new Map();
    for (const str of strs) {
        const key = Array.from(str).sort().join('');
        const arr = (strMap.get(key) || []);
        arr.push(str);
        strMap.set(key, arr);
    }
    return Array.from(strMap.values());
}
;
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
