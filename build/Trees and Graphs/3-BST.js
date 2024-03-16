"use strict";
// Binary Search Tree / Es un Tipo de arbol 
Object.defineProperty(exports, "__esModule", { value: true });
// For each node, all values in its left subtree are less than the value in the node, 
// and all values in its right subtree are greater than the value in the node.
// This property also implies that values in a BST must be unique.
function rangeSumBST(root, low, high) {
    if (!root)
        return 0;
    let ans = 0;
    if (root.val >= low && root.val <= high)
        ans += root.val;
    if (root.val < low)
        ans += rangeSumBST(root.left, low, high);
    if (root.val > high)
        ans += rangeSumBST(root.right, low, high);
    return ans;
}
function getMinimumDifference(root) {
    // Obtener la diferencia menor entre cualquiera dos números del arbol
    // Se agrega todo a un arreglo (usando DFS)
    // y se comparan 1-1 para ver cuál es la menor pareja
    const helper = (root) => {
        if (!root)
            return;
        helper(root.left);
        values.push(root.val);
        helper(root.right);
    };
    let values = [];
    helper(root);
    let ans = Infinity;
    for (let i = 1; i < values.length; i++) {
        ans = Math.min(ans, Math.abs(values[i] - values[i - 1]));
    }
    return ans;
}
;
function isValidBST(root) {
    // Un Binary Search Tree es válido si sus nodos izquierdos son menores a él y sus derechos mayores 
    // actualizando los rangos [menor, mayor] todos los nodos deben de estar en ese rango
    // Si bajo hacia la izquierda, actualizo el mayor (puede ser tan menor como quiera, pero no mayor al nodo)
    // Si bajo a la derecha, actualizo el menor (puede ser tan mayor como quiera, pero no menor al nodo)
    const helper = (node, left, right) => {
        if (!node)
            return true;
        if (!(left < node.val && node.val < right))
            return false;
        let isValidLeft = helper(node.left, left, node.val);
        let isValidRight = helper(node.right, node.val, right);
        return isValidLeft && isValidRight;
    };
    return helper(root, -Infinity, Infinity);
}
;
function closestValue(root, target) {
    if (!root)
        return -1;
    let val = -1;
    if (target < root.val)
        val = closestValue(root.left, target);
    if (target > root.val)
        val = closestValue(root.right, target);
    if (val == -1)
        return root.val; // Arbol de un sólo nodo retorna el mismo nodo
    if (Math.abs(root.val - target) == Math.abs(val - target))
        return Math.min(root.val, val); // Si la distancia entre uno y el otro es la misma retorne el menor valor
    if (Math.abs(root.val - target) < Math.abs(val - target))
        return root.val; // Si la distancia es menor con el nodo, retorne el nodo
    return val; // Sino retorne el valor
}
;
