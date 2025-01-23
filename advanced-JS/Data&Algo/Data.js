/* -----------Data Structures---------------
  Arrays
  Stacks
  Queues
  Linked Lists
  Trees
  Tries
  Graphs
  HashTables
*/

/* -----------Algorithms---------------
  Sorting
  Dynamic Programming
  BFS +  DFS (searching)
  Recursion
*/

/* 
  Hash Tables ---> Objects
  hash = {
    key: value,
    key: value
  }

  Fast Lookups          Unordered
  Fast inserts          Slow keys iteration
  Flexible Keys
*/

function firstRecurringCharacter2(arr) {
  let objs = {};
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!objs[item]) {
      objs[item] = 1;
    } else {
      return input[i]
    }
  }
  return undefined
}

firstRecurringCharacter2([1,5,5,1,3,4,6])