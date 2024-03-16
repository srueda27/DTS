// Breadth First Search 
// In BFS, we traverse all nodes at a given depth before moving on to the next depth

import { BinaryTree } from "./1-DFS";

function printAllNodes(root: BinaryTree) {
  let queue = [root];
  
  while (queue.length) {
    let nodesInCurrentLevel = queue.length;
    let nextQueue = [];

    for (let i = 0; i < nodesInCurrentLevel; i++) {
      let node = queue[i];

      // do some logic here on the current node
      console.log(node.val);

      // put the next level onto the queue
      if (node.left) {
        nextQueue.push(node.left);
      }
      if (node.right) {
        nextQueue.push(node.right);
      }
    }

    queue = nextQueue;
  }
}

function rightSideView(root: BinaryTree | null): number[] {
  if (!root) {
    return [];
  }

  let ans = [];
  let queue = [root];

  while (queue.length) {
    let nodesInCurrentLevel = queue.length;
    let nextQueue = [];

    ans.push(queue[queue.length - 1].val); // this is the rightmost node for the current level
    for (let i = 0; i < nodesInCurrentLevel; i++) {
      let node = queue[i];
      if (node.left) {
        nextQueue.push(node.left);
      }
      if (node.right) {
        nextQueue.push(node.right);
      }
    }

    queue = nextQueue;
  }

  return ans;
};


function largestValues(root: BinaryTree | null): number[] {
  // Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).
  if (!root) return []
  
  let queue = [root];
  let ans: number[] = [root.val]
  // let ans: number[] = []

  while (queue.length) {
    let nodesInCurrentLevel = queue.length;
    let nextQueue = [];
    let vals: number[] = []
    // let max = -Infinity

    for (let i = 0; i < nodesInCurrentLevel; i++) {
      let node = queue[i];

      // max = Math.max(max, node.val)

      // put the next level onto the queue
      if (node.left) {
        nextQueue.push(node.left);
        vals.push(node.left.val)
      }
      if (node.right) {
        nextQueue.push(node.right);
        vals.push(node.right.val)
      }
    }

    if (vals.length) ans.push(Math.max(...vals))

    queue = nextQueue
  }

  return ans
};


function deepestLeavesSum(root: BinaryTree | null): number {
  // Given the root of a binary tree, return the sum of values of its deepest leaves.
  let queue = [root];
  let preQueue = queue

  while (queue.length) {
    let nodesInCurrentLevel = queue.length;
    let nextQueue = [];

    for (let i = 0; i < nodesInCurrentLevel; i++) {
      let node = queue[i];

      // put the next level onto the queue
      if (node.left) {
        nextQueue.push(node.left);
      }
      if (node.right) {
        nextQueue.push(node.right);

      }
    }

    preQueue = queue
    queue = nextQueue;
  }

  return queue.reduce((acc, node) => acc + node.val, 0)
};