import { BinaryTree } from "./1-DFS";

// Cuándo pidan la menor distancia usar BFS


function shortestPathBinaryMatrix(grid: number[][]) {
  let valid = (row: number, col: number) => {
    return 0 <= row && row < n && 0 <= col && col < n && grid[row][col] == 0;
  }

  if (grid[0][0] == 1) {
    return -1;
  }

  let n = grid.length;
  let seen: boolean[][] = [];
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
};


// Dando la raíz de arbol binario, un nodo target y un numero k.
// Encontrar todos los nodos que están a la distancia k del nodo target
/* ESTRATEGIA
  recorrer el arbol binario para asignar la propiedad padre para poder viajar hacía arriba, así se vuelve un Grafo
  Posteriormente aplicar BFS sobre las direcciones del target (left, right, parent) para encontrar la respuesta
  Los nodos que queden en la queue cuándo se llegue a la distancia k son la respuesta
*/
function distanceK(root: BinaryTree, target: BinaryTree, k: number) {
  let dfs = (node: BinaryTree, parent: BinaryTree) => {
    if (!node) {
      return;
    }

    node.parent = parent; // Para poder viajar hacía arriba
    dfs(node.left, node);
    dfs(node.right, node);
  }

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
};


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
function updateMatrix(mat: number[][]): number[][] {
  let valid = (row: number, col: number) => {
    return 0 <= row && row < matrizRowLength && 0 <= col && col < matrizColLength && mat[row][col] == 1;
  }


  let matrizRowLength = mat.length;
  let matrizColLength = mat[0].length;
  let queue: number[][] = [];
  let seen: boolean[][] = [];
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
};



// El camino más corto eliminando k obstaculos
function shortestPathRemoval(grid: number[][], k: number): number {
  let valid = (row: number, col: number) => {
    return 0 <= row && row < m && 0 <= col && col < n;
  }

  let m = grid.length;
  let n = grid[0].length;
  let queue: [number, number, number][] = [[0, 0, k]];
  let seen: number[][] = [];
  for (let i = 0; i < m; i++) {
    seen.push([]);
    for (let j = 0; j < n; j++) {
      seen[i].push(-1);
    }
  }

  let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let steps = 0;

  while (queue.length) {
    let currentLength = queue.length;
    let nextQueue: [number, number, number][] = [];

    for (let i = 0; i < currentLength; i++) {
      let [row, col, remain] = queue[i];
      if (row == m - 1 && col == n - 1) {
        return steps;
      }

      // if the current square is an obstacle, we need to spend one of our removals
      if (grid[row][col] == 1) {
        if (remain == 0) {
          continue;
        } else {
          remain--;
        }
      }

      // if the square has already been visited, but with more removals, then the current
      // path is pointless, since more removals is better
      if (seen[row][col] >= remain) {
        continue;
      }

      seen[row][col] = remain;
      for (const [dx, dy] of directions) {
        let nextRow = row + dy, nextCol = col + dx;
        if (valid(nextRow, nextCol)) {
          nextQueue.push([nextRow, nextCol, remain]);
        }
      }
    }

    queue = nextQueue;
    steps++;
  }

  return -1;
}



// El camino más corto alternando colores
function shortestAlternatingPaths(n: number, redEdges: number[][], blueEdges: number[][]) {
  let addToGraph = (color: number, edges: number[][]) => {
    for (let i = 0; i < n; i++) {
      graph.get(color).set(i, []);
    }

    for (const [x, y] of edges) {
      graph.get(color).get(x).push(y);
    }
  }

  const RED = 0;
  const BLUE = 1;

  let graph = new Map();
  graph.set(RED, new Map());
  graph.set(BLUE, new Map());
  addToGraph(RED, redEdges);
  addToGraph(BLUE, blueEdges);

  let ans = new Array(n).fill(Infinity);
  let queue = [[0, RED], [0, BLUE]];
  let seen = [];
  for (let i = 0; i < n; i++) {
    seen.push(new Array(2).fill(false));
  }

  seen[0][RED] = true;
  seen[0][BLUE] = true;

  let steps = 0;

  while (queue.length) {
    let currentLength = queue.length;
    let nextQueue = [];

    for (let i = 0; i < currentLength; i++) {
      let [node, color] = queue[i];
      ans[node] = Math.min(ans[node], steps);

      for (const neighbor of graph.get(color).get(node)) {
        if (!seen[neighbor][1 - color]) {
          seen[neighbor][1 - color] = true;
          nextQueue.push([neighbor, 1 - color]);
        }
      }
    }

    queue = nextQueue;
    steps++;
  }

  for (let i = 0; i < n; i++) {
    if (ans[i] == Infinity) {
      ans[i] = -1;
    }
  }

  return ans;
};



/* 
[
  ['.','.']
  ['.','+']
]

[0,0]
*/
// console.log(nearestExit([["+", "+", ".", "+"], [".", ".", ".", "+"], ["+", "+", "+", "."]], [1, 2]))
// console.log(nearestExit([["+", "+", "+"], [".", ".", "."], ["+", "+", "+"]], [1, 0]))
// console.log(nearestExit([[".", "+"]], [0, 0]))
function nearestExit(maze: string[][], entrance: number[]): number {
  let valid = (row: number, col: number) => {
      return 0 <= row && row < mazeRowLength && 0 <= col && col < mazeColLength && maze[row][col] == '.';
  }

  let entranceRow = entrance[0]
  let entranceCol = entrance[1]
  maze[entranceRow][entranceCol] = '+'

  let mazeRowLength = maze.length;
  let mazeColLength = maze[0].length;

  if(!mazeRowLength || !mazeColLength) return -1

  let seen: boolean[][] = [];
  for (let i = 0; i < mazeRowLength; i++) {
      seen.push(new Array(mazeColLength).fill(false));
  }
  seen[entranceRow][entranceCol] = true;


  let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let steps = 0;
  let queue: number[][] = [[entranceRow, entranceCol]];

  while (queue.length) {
      let currentLength = queue.length;
      let nextQueue = [];

      for (let i = 0; i < currentLength; i++) {
          let [row, col] = queue[i];

          if ((row == 0 || row == mazeRowLength - 1 || col == 0 || col == mazeColLength - 1) && maze[row][col] == '.') return steps

          for (const [dx, dy] of directions) {
              let nextRow = row + dx
              let nextCol = col + dy

              if (valid(nextRow, nextCol)) {
                  seen[nextRow][nextCol] = true;
                  nextQueue.push([nextRow, nextCol]);
              }
          }
      }

      queue = nextQueue
      steps++
  }

  return -1
};



// Combinaciones de una caja fuerte con deadends
// console.log(openLock(["0201","0101","0102","1212","2002"], '0202'))
function openLock(deadends: string[], target: string): number {
  let neighbors = (node: string) => {
      let ans = [];
      for (let i = 0; i < 4; i++) {
          let num = node[i];
          for (const change of [-1, 1]) {
              let x = (+num + change + 10) % 10
              ans.push(node.slice(0, i) + x + node.slice(i + 1));
          }
      }

      return ans;
  } 

  if (deadends.includes("0000")) {
      return -1;
  }

  let queue = ["0000"];
  let seen = new Set(deadends);
  seen.add("0000");

  let steps = 0;

  while (queue.length) {
      let currentLength = queue.length;
      let nextQueue = [];

      for (let i = 0; i < currentLength; i++) {
          const node = queue[i];
          if (node == target) {
              return steps;
          }

          for (const neighbor of neighbors(node)) {
              if (!seen.has(neighbor)) {
                  seen.add(neighbor);
                  nextQueue.push(neighbor);
              }
          }
      }

      steps++;
      queue = nextQueue;
  }

  return -1;
};



/* 
Ejemplo en Python de BFS
from collections import deque

def friend(network, person):
    degrees = {person: 0}  # Initialize the degrees dictionary with the starting person
    queue = deque([person])  # Initialize the queue with the starting person

    while queue:
        current = queue.popleft()
        current_degree = degrees[current]

        for friend in network.get(current, []):
            if friend not in degrees:
                degrees[friend] = current_degree + 1
                queue.append(friend)
    
    adjusted_degrees = {friend: degree -1 for friend, degree in degrees.items() if friend != person}
    
    return adjusted_degrees

# Example usage
network = {
    "Alice": ["Bob", "Eli"],
    "Bob": ["Alice", "Ana"],
    "Eli": ["Alice", "Ana"],
    "Ana": ["Bob", "Eli", "Pep"],
    "Pep": ["Ana"]
}

result = friend(network, 'Alice')
print(result)

*/