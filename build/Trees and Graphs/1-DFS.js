"use strict";
// Depth First Search / Profundidad primero
// Depth la distancia desde un nodo a la raíz
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryTree = void 0;
/*
// Arboles binario
  // Preorder
  // Inorder
  // Postorder
*/
// Recorrer un Arbol binario / DFS Binary Tree
class BinaryTree {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
exports.BinaryTree = BinaryTree;
function dfs(node) {
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
function dfsOrder(node) {
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
function hasPathSum(root, targetSum, sum = 0) {
    if (!root) {
        return false;
    }
    if (!root.left && !root.right) {
        return sum + root.val == targetSum;
    }
    const left = hasPathSum(root.left, targetSum, sum + root.val); // false
    const right = hasPathSum(root.right, targetSum, sum + root.val); //true
    return left || right;
}
;
// Manera iterativa de DFS 
function hasPathSumI(root, targetSum) {
    if (!root) {
        return false;
    }
    let stack = [[root, 0]]; // Guardar el root y acumulado 0 inicialmente
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
}
;
function goodNodes(root, max = 0) {
    if (!root) {
        return 0;
    }
    const left = goodNodes(root.left, Math.max(max, root.val)); // 4 => 1
    const right = goodNodes(root.right, Math.max(max, root.val)); // 4 => 1
    let ans = left + right;
    if (root.val >= max) {
        ans++;
    }
    return ans;
}
;
