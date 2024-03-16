// Armar un Map {key: value}
// Si la llave existe 
//   adicione 1 
// Sino 
//   Creela 
// Lo mismo se hace con counts.set(x, (counts.get(x) || 0) + 1);
// Encontrar los subarrays dónde la suma sea igual al goal
function numSubarraysWithSum(nums, goal) {
    let map = new Map();
    map.set(0, 1);
    let ans = 0, curr = 0;
    for (const num of nums) {
        curr += num;
        ans += map.get(curr - goal) || 0;
        map.set(curr, (map.get(curr) || 0) + 1);
    }
    return ans;
}
;
// Given an array of integers nums and an integer k, return the total number of subarrays whose 
// sum equals to k  => usamos curr += num
// got odd numbers  => contamos sólo los impares (num % 2 = 1) curr += num % 2
function numberOfSubarrays(nums, k) {
    let map = new Map();
    map.set(0, 1);
    let ans = 0, curr = 0;
    for (const num of nums) {
        curr += num % 2;
        ans += map.get(curr - k) || 0;
        map.set(curr, (map.get(curr) || 0) + 1);
    }
    return ans;
}
;
console.log(numberOfSubarrays([1, 1, 2, 1, 1], 3));
function equalPairs(cards) {
    let rows = new Map();
    let cols = [];
    for (let i = 0; i < cards.length; i++) {
        const row = cards[i].join();
        rows.set(row, (rows.get(row) || 0) + 1);
        let col = [];
        for (let j = 0; j < cards.length; j++) {
            col.push(cards[j][i]);
        }
        cols.push(col);
    }
    let ans = 0;
    for (const col of cols) {
        if (rows.get(col.join()))
            ans += rows.get(col.join());
    }
    return ans;
}
;
console.log(equalPairs([[3, 2, 1], [1, 7, 6], [2, 7, 7]]));
