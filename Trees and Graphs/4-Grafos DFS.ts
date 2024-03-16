// Grafos se trata de saber cómo estan ubicados los adyacentes y cómo recorrerlos
/* 

definir un método recursivo para recorrer todos los nodos adyacentes 
  // markNeighbors se define para saber de manera recursiva quienes están al lado
    // recibe un nodo y se revisa hacía dónde se puede mover
    // con quienes tiene relación en caso de un Map
  // irlos marcado como vistos para no volverlos a ver

recorrer la matriz usando los vistos como recursos para realizar procesamientos

*/

// edges = [[0, 1], [1, 2], [2, 0], [2, 3]]
function buildGraph(edges: number[][]) {
  let graph = new Map();
  for (const [x, y] of edges) {
    if (!graph.has(x)) {
      graph.set(x, []);
    }

    graph.get(x).push(y);

    // if (!graph.has(y)) {
    //     graph.set(y, []);
    // }

    // graph.get(y).push(x);
    // uncomment the above lines if the graph is undirected
  }
}

// Adjacency Matrix 
/* 
[
  [0,1,0,0],
  [0,0,1,0],
  [1,0,0,1],
  [0,0,0,0]
]

Las conexiones de cualquier nodo se encontrarían en matrix[nodo][i] 
Dónde la conexión entre 2->1 sería matrix[2][1] => 0 Entonces no hay conexión
 */


function canVisitAllRooms(rooms: number[][]): boolean {
  const markNeighbors = (node: number) => { // Visitar todos los nodos de un nodo, 
    //  pero los que no he visto antes en otro nodo (Evitar ciclos)
    for (const neighbor of rooms[node]) {
      if (!seen[neighbor]) { // Si uso un arreglo de booleans en lugar de un set
        //if (!seen.has(neighbor)) {
        seen[neighbor] = true // Si uso un arreglo de booleans en lugar de un set
        //seen.add(neighbor)
        markNeighbors(neighbor)
      }
    }
  }

  let seen: boolean[] = new Array(rooms.length).fill(false) // En lugar de usar un set
  seen[0] = true
  markNeighbors(0)

  //console.log(seen)

  return seen.reduce((acc, a) => a ? acc + 1 : acc, 0) == rooms.length
};


// Calcular el número de provincias o conjuntos de nodos. 
// Iniciar en un modo aplicar DFS para marcar todas sus conexiones 
function findCircleNum(isConnected: number[][]): number {
  const markNeighbors = (node: number) => { // Visitar todos los nodos de un nodo, 
    //  pero los que no he visto antes en otro nodo (Evitar ciclos)
    for (const neighbor of graph.get(node)) {
      // if (!seen[neighbor]) { // Si uso un arreglo de booleans en lugar de un set
      if (!seen.has(neighbor)) {
        // seen[neighbor] = true // Si uso un arreglo de booleans en lugar de un set
        seen.add(neighbor)
        markNeighbors(neighbor)
      }
    }
  }

  let n = isConnected.length;
  let graph = new Map<number, number[]>(); // Para poder ver todos las conexiones que tiene ese nodo

  // let seen = new Array(n).fill(false); // Un arreglo de booleans en lugar de usar un set arreglo[nodo] = false
  let seen = new Set<number>(); // En lugar de usar un set

  // En Javascript se ingresan primero todos los elementos del mapa 
  // para luego no preguntar en cada iteración si el elemento existe
  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (let i = 0; i < n; i++) {
    // if(!graph.get(i)) graph.set(i, [])
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j]) {
        // if(!graph.get(j)) graph.set(j, [])
        graph.get(i).push(j);
        graph.get(j).push(i);
      }
    }
  }

  let ans = 0
  for (let i = 0; i < n; i++) {
    // if (!seen[i]) { // Si uso un arreglo de booleans en lugar de un set
    if (!seen.has(i)) {
      ans++
      seen.add(i)
      // seen[i] = true // agregarlo a la lista de vistos y marcar sus vecinos
      markNeighbors(i)
    }
  }

  console.log(seen)
  console.log(ans)
  return ans
}


/* 
[
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
] => 1
[
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
] => 3
*/
function numIslands(grid: string[][]): number {
  let valid = (row: number, col: number) => {
    return 0 <= row && row < m && 0 <= col && col < n && grid[row][col] == "1";
  }

  let dfs = (row: number, col: number) => {
    seen[row][col] = true;

    for (const [dx, dy] of directions) {
      let nextRow = row + dy, nextCol = col + dx;
      if (valid(nextRow, nextCol) && !seen[nextRow][nextCol]) {
        seen[nextRow][nextCol] = true;
        dfs(nextRow, nextCol);
      }
    }
  };

  let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let m = grid.length;
  let n = grid[0].length;
  let seen: boolean[][] = [];

  for (let i = 0; i < m; i++) {
    seen.push(new Array(n).fill(false));
  }

  let ans = 0;
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] == "1" && !seen[row][col]) {
        ans++;
        dfs(row, col);
      }
    }
  }

  return ans;
};


// console.log(minReorder(5, [[1, 0], [1, 2], [2, 3], [4, 2]]))
function minReorderCity(n: number, connections: number[][]): number {
  let convertToHash = (row: number, col: number) => {
    return row + "," + col;
  }

  let dfs = (node: number) => {
    let ans = 0;
    for (const neighbor of graph.get(node)) {
      if (!seen[neighbor]) {
        if (roads.has(convertToHash(node, neighbor))) {
          ans++;
        }

        seen[neighbor] = true;
        ans += dfs(neighbor);
      }
    }

    return ans;
  }

  let roads = new Set();
  let graph = new Map();
  let seen = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (const [x, y] of connections) {
    graph.get(x).push(y);
    graph.get(y).push(x);
    roads.add(convertToHash(x, y));
  }

  seen[0] = true;
  return dfs(0);
};


// console.log(findSmallestSetOfVertices(5, [[1, 3], [2, 0], [2, 3], [1, 0], [4, 1], [0, 3]]))
// console.log(findSmallestSetOfVertices(6, [[0, 1], [0, 2], [2, 5], [3, 4], [4, 2]]))
// console.log(findSmallestSetOfVertices(3, [[0, 2], [1, 2], [1, 0]]))
function findSmallestSetOfVertices(n: number, edges: number[][]): number[] {
  const dfs = (node: number, seenMyself: Set<number> = new Set([node])) => {
    let visited = new Set<number>()

    if (!mapaRutas.get(node)) return visited

    for (const neighbor of mapaRutas.get(node)) {
      if (!seenMyself.has(neighbor)) {
        seenMyself.add(neighbor)
        let visitedByNeighbor = dfs(neighbor, seenMyself)
        visited = new Set([...visitedByNeighbor, neighbor, ...visited])
        mapaRutas.delete(neighbor)
      }
    }

    return visited
  }

  let mapaRutas = new Map<number, Set<number>>();

  for (let i = 0; i < n; i++) {
    mapaRutas.set(i, new Set())
  }

  for (let i = 0; i < edges.length; i++) {
    mapaRutas.get(edges[i][0]).add(edges[i][1])
  }

  for (let i = 0; i < n; i++) {
    if (mapaRutas.get(i)) {
      let visited = dfs(i)
      mapaRutas.set(i, visited)
    }
  }

  return Array.from(mapaRutas.keys())
};

function findSmallestSetOfVerticesImprove(n: number, edges: number[][]): number[] {
  let indegree = new Array(n).fill(0)
  for (const [x, y] of edges) {
    indegree[y]++
  }

  let ans: number[] = []
  for (let i = 0; i < n; i++) {
    if (indegree[i] == 0) ans.push(i)
  }

  return ans
}


// console.log(validPath(10, [[0, 7], [0, 8], [6, 1], [2, 0], [0, 4], [5, 8], [4, 7], [1, 3], [3, 5], [6, 5]], 7, 5))
function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
  if (edges.length == 0) return true

  const dfs = (node: number): boolean => {
    let found = false

    for (const neighbor of mapaRutas.get(node)) {
      if (neighbor == destination) return true
      if (!seen[neighbor]) {
        seen[neighbor] = true
        found = dfs(neighbor) || found

        if (found) break
      }
    }

    return found
  }

  let seen = new Array(n).fill(false);
  let mapaRutas = new Map<number, Set<number>>();

  for (let i = 0; i < n; i++) {
    mapaRutas.set(i, new Set())
  }

  for (let i = 0; i < edges.length; i++) {
    mapaRutas.get(edges[i][0]).add(edges[i][1])
    mapaRutas.get(edges[i][1]).add(edges[i][0])
  }

  if (mapaRutas.get(source).has(destination)) return true

  return dfs(source)
};