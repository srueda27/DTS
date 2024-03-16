// console.log(bananasKoko([3, 6, 7, 11], 8))
function bananasKoko(piles, h) {
    let check = (k) => {
        let hours = 0;
        for (const bananas of piles) {
            hours += Math.ceil(bananas / k);
        }
        return hours <= h;
    };
    let left = 1;
    let right = Math.max(...piles);
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (check(mid)) {
            right = mid - 1;
        }
        else {
            left = mid + 1;
        }
    }
    return left;
}
;
// Trains
function minSpeedOnTime(dist, hour) {
    let check = (k) => {
        let t = 0;
        for (const d of dist) {
            t = Math.ceil(t);
            t += d / k;
        }
        return t <= hour;
    };
    if (dist.length > Math.ceil(hour)) {
        return -1;
    }
    let left = 1;
    let right = Math.pow(10, 7);
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (check(mid)) {
            right = mid - 1;
        }
        else {
            left = mid + 1;
        }
    }
    return left;
}
;
// Alturas de un escalador, el menor esfuerzo posible
function minimumEffortPath(grid) {
    let valid = (row, col) => {
        return 0 <= row && row < m && 0 <= col && col < n;
    };
    let dfs = (row, col, effort) => {
        seen[row][col] = true;
        let finalized = false;
        for (const [dx, dy] of directions) {
            let nextRow = row + dy, nextCol = col + dx;
            if (valid(nextRow, nextCol) && !seen[nextRow][nextCol]) {
                if (Math.abs(grid[row][col] - grid[nextRow][nextCol]) <= effort) {
                    if (nextRow == m - 1 && nextCol == n - 1)
                        return true;
                    seen[nextRow][nextCol] = true;
                    finalized = dfs(nextRow, nextCol, effort) || finalized;
                }
            }
        }
        return finalized;
    };
    let check = (effort) => {
        seen = [];
        for (let i = 0; i < m; i++) {
            seen.push(new Array(n).fill(false));
        }
        return dfs(0, 0, effort);
    };
    let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let m = grid.length;
    let n = grid[0].length;
    if (m == 1 && n == 1)
        return 0;
    let seen = [];
    let left = 0;
    let right = 0;
    for (const arr of grid) {
        right = Math.max(right, Math.max(...arr));
    }
    let effort = 0;
    while (left <= right) {
        effort = Math.floor((left + right) / 2);
        if (check(effort)) {
            right = effort - 1;
        }
        else {
            left = effort + 1;
        }
    }
    return left;
}
;
// Cantidad máxima de dulces
// Se invirtió la validación del binarySearch if check actualice el left y se retorna right
function maximumCandies(candies, k) {
    let check = (mid) => {
        let sum = 0;
        for (const candy of candies) {
            sum += Math.floor(candy / mid);
        }
        return sum >= k;
    };
    let left = 0;
    let right = Math.max(...candies);
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (check(mid)) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return right;
}
;
