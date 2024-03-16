// Depth First Search / Profundidad primero
// Depth la distancia desde un nodo a la raíz

/* 
// Arboles binario 
  // Preorder
  // Inorder
  // Postorder 
*/

// Recorrer un Arbol binario / DFS Binary Tree

export class BinaryTree {
  val: number | string | any
  left: BinaryTree | null
  right: BinaryTree | null
  parent?: BinaryTree | null
  constructor(val: any) {
    this.val = val;
    this.left = null
    this.right = null
  }
}

function dfs(node: BinaryTree) {
  if (!node) { // significa que no hay nada 
    return;
  }

  dfs(node.left);
  dfs(node.right);
  return;
}

// Preorder Traversal 
// antes de los hijos

// Inorder Traversal 
// en la mitad de los hijos - después de la izquierda

// Postorder Traversal 
// después de los hijos

function dfsOrder(node: BinaryTree) {
  if (!node) {
    return;
  }

  // console.log(node.val); // Preorder - antes de pasar a los hijos
  dfsOrder(node.left);
  // console.log(node.val); // Inorder - después de terminar el izquierdo
  dfsOrder(node.right);
  // console.log(node.val); // Preorder - después de terminar ambos lados
  return;
}

// Encontrar si existe un camino donde la suma de sus nodes es igual a targetSum
function hasPathSum(root: BinaryTree | null, targetSum: number, sum: number = 0): boolean {
  if (!root) {
    return false
  }

  if (!root.left && !root.right) {
    return sum + root.val == targetSum
  }

  const left = hasPathSum(root.left, targetSum, sum + root.val) // false
  const right = hasPathSum(root.right, targetSum, sum + root.val) //true

  return left || right
};


// Manera iterativa de DFS 
function hasPathSumI(root: BinaryTree, targetSum: number) {
  if (!root) {
    return false;
  }

  let stack: [BinaryTree, number][] = [[root, 0]]; // Guardar el root y acumulado 0 inicialmente
  while (stack.length) {
    let [node, curr] = stack.pop();
    // if both children are null, then the node is a leaf
    if (!node.left && !node.right) {
      if (curr + node.val == targetSum) {
        return true;
      }
    }

    curr += node.val;
    if (node.left) {
      stack.push([node.left, curr]);
    }
    if (node.right) {
      stack.push([node.right, curr]);
    }
  }

  return false;
};


function goodNodes(root: BinaryTree | null, max: number = 0): number {
  if (!root) {
    return 0
  }

  const left = goodNodes(root.left, Math.max(max, root.val))   // 4 => 1
  const right = goodNodes(root.right, Math.max(max, root.val)) // 4 => 1

  let ans = left + right
  if (root.val >= max) {
    ans++
  }

  return ans
};

