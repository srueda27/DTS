/* This is how binary search is implemented:

Declare left = 0 and right = arr.length - 1. 
These variables represent the inclusive bounds of the current search space at any given time. 
Initially, we consider the entire array.

While left <= right:

Calculate the middle of the current search space, mid = (left + right) // 2 (floor division)

Check arr[mid]. There are 3 possibilities:
If arr[mid] = x, then the element has been found, return.
If arr[mid] > x, then halve the search space by doing right = mid - 1.
If arr[mid] < x, then halve the search space by doing left = mid + 1.

If you get to this point without arr[mid] = x, then the search was unsuccessful. 
The left pointer will be at the index where x would need to be inserted to maintain arr being sorted. 

*/

function binarySearch(arr: number[], target: number) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] == target) {
      // do something
      return;
    }

    if (arr[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  // target is not in arr, but left is at the insertion point
  return left;
}

// Este encuentra el index del lado izquierdo en caso de duplicados
function binarySearchDuplicatesLeft(arr: number[], target: number) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// Este encuentra el index del lado derecho en caso de duplicados
function binarySearchDuplicatesRight(arr: number[], target: number) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// Encuentra el punto dónde debería de ir el target
// console.log(binarySearch([1, 2, 3, 3, 3, 4, 5], 3))      // => idx 2 
// console.log(binarySearch([1, 2, 3, 3, 4, 5], 3))         // => idx 2
// console.log(binarySearch([1, 2, 3, 4, 5], 3))            // => idx 2
// console.log(binarySearch([1, 2, 4, 5], 3))               // => idx 2
function binarySearchInsertionPoint(arr: number[], target: number) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}


function searchMatrix(matrix: number[][], target: number): boolean {
  let arr = matrix.flat()
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] == target) {
      // do something
      return true;
    }

    if (arr[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }


  // target is not in arr, but left is at the insertion point
  return false;
}

// Tratar la matriz como un arreglo de una sola dimensión sin usar flat
function searchMatrixOptimizado(matrix: number[][], target: number): boolean {
  let rows = matrix.length
  let cols = matrix[0].length

  let left = 0;
  let right = rows * cols - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let row = Math.floor(mid / cols)
    let col = mid % cols
    let num = matrix[row][col]

    if (num == target) {
      // do something
      return true;
    }

    if (num > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }


  // target is not in arr, but left is at the insertion point
  return false;
}


// Spells and Potions
function successfulPairs(spells: number[], potions: number[], success: number): number[] {
  const findIndex = (arr: number[], target: number) => {
    let left = 0;
    let right = arr.length;

    while (left < right) {
      let mid = Math.floor((left + right) / 2);

      if (arr[mid] >= target) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  }

  potions.sort((a, b) => a - b)

  let ans: number[] = []
  let n = potions.length

  for (let i = 0; i < spells.length; i++) {
    let spell = spells[i]
    let target = success / spell
    let idx = findIndex(potions, target)

    if (idx == n) {
      if (potions[0] * spell < success) {
        ans.push(0)
      } else {
        ans.push(n - idx)
      }
    } else {
      ans.push(n - idx)
    }

  }

  return ans
};


// El binary Search devuelve el insertion point
function successfulPairsOptimizado(spells: number[], potions: number[], success: number): number[] {
  let binarySearch = (arr: number[], target: number) => {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return left;
  }

  potions.sort((a, b) => a - b);
  let ans = [];
  let m = potions.length;

  for (const spell of spells) {
    let i = binarySearch(potions, success / spell);
    ans.push(m - i);
  }

  return ans;
}
