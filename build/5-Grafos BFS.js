"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Cuándo pidan la menor distancia usar BFS
function shortestPathBinaryMatrix(grid) {
    let valid = (row, col) => {
        return 0 <= row && row < n && 0 <= col && col < n && grid[row][col] == 0;
    };
    if (grid[0][0] == 1) {
        return -1;
    }
    let n = grid.length;
    let seen = [];
    for (let i = 0; i < n; i++) {
        seen.push(new Array(n).fill(false));
    }
    seen[0][0] = true;
    let queue = [[0, 0]]; // El punto/nodo inicial, en este caso (0,0) de la matriz
    let directions = [[0, 1], [1, 0], [1, 1], [-1, -1], [-1, 1], [1, -1], [0, -1], [-1, 0]];
    let steps = 0;
    while (queue.length) {
        let currentLength = queue.length;
        let nextQueue = [];
        steps++;
        for (let i = 0; i < currentLength; i++) {
            let [row, col] = queue[i];
            if (row == n - 1 && col == n - 1) { // Si llegué al final de la matriz
                return steps;
            }
            for (const [dx, dy] of directions) {
                let nextRow = row + dy, nextCol = col + dx;
                if (valid(nextRow, nextCol) && !seen[nextRow][nextCol]) {
                    seen[nextRow][nextCol] = true;
                    nextQueue.push([nextRow, nextCol]);
                }
            }
        }
        queue = nextQueue;
    }
    return -1;
}
;
// Dando la raíz de arbol binario, un nodo target y un numero k.
// Encontrar todos los nodos que están a la distancia k del nodo target
/* ESTRATEGIA
  recorrer el arbol binario para asignar la propiedad padre para poder viajar hacía arriba, así se vuelve un Grafo
  Posteriormente aplicar BFS sobre las direcciones del target (left, right, parent) para encontrar la respuesta
  Los nodos que queden en la queue cuándo se llegue a la distancia k son la respuesta
*/
function distanceK(root, target, k) {
    let dfs = (node, parent) => {
        if (!node) {
            return;
        }
        node.parent = parent; // Para poder viajar hacía arriba
        dfs(node.left, node);
        dfs(node.right, node);
    };
    dfs(root, null);
    let queue = [target];
    let seen = new Set([target]);
    let distance = 0;
    while (queue.length && distance < k) {
        let currentLength = queue.length;
        let nextQueue = [];
        for (let i = 0; i < currentLength; i++) {
            let node = queue[i];
            for (const neighbor of [node.left, node.right, node.parent]) {
                if (neighbor && !seen.has(neighbor)) {
                    seen.add(neighbor);
                    nextQueue.push(neighbor);
                }
            }
        }
        queue = nextQueue;
        distance++;
    }
    return queue.map(node => node.val);
}
;
/*
Retornar la distancia al 0 más cercano
ESTRATEGIA
  Iniciar con todos los ceros y buscar 1s con BFS, en cuántos pasos se encuentre es la distancia
[
  [0,0,0],          [0,0,0]
  [0,1,0],    =>    [0,1,0]
  [0,0,0]           [0,0,0]
]
*/
function updateMatrix(mat) {
    let valid = (row, col) => {
        return 0 <= row && row < matrizRowLength && 0 <= col && col < matrizColLength && mat[row][col] == 1;
    };
    let matrizRowLength = mat.length;
    let matrizColLength = mat[0].length;
    let queue = [];
    let seen = [];
    for (let i = 0; i < matrizRowLength; i++) {
        seen.push(new Array(matrizColLength).fill(false));
    }
    for (let row = 0; row < matrizRowLength; row++) {
        for (let col = 0; col < matrizColLength; col++) {
            if (mat[row][col] == 0) {
                queue.push([row, col]);
                seen[row][col] = true;
            }
        }
    }
    let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let steps = 0;
    while (queue.length) {
        let currentLength = queue.length;
        let nextQueue = [];
        steps++;
        for (let i = 0; i < currentLength; i++) {
            const [row, col] = queue[i];
            for (const [dx, dy] of directions) {
                let nextRow = row + dy, nextCol = col + dx;
                if (valid(nextRow, nextCol) && !seen[nextRow][nextCol]) {
                    seen[nextRow][nextCol] = true;
                    nextQueue.push([nextRow, nextCol]);
                    mat[nextRow][nextCol] = steps;
                }
            }
        }
        queue = nextQueue;
    }
    return mat;
}
;
