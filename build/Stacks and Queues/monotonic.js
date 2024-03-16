// Stacks or Queues que están ordenadas.
// Para que siempre cumplan con un orden hay que eliminar los elementos que no cumplen el orden
// monotonic decreasing
// [1, 5, 8, 15, 23] push(14) => quitar 23, luego quitar 15 => [1, 5, 8, 14]
function dailyTemperatures(temperatures) {
    // Encontrar cuántos días hay que esperar para que aparezca un día más caliente
    let stack = [];
    let answer = new Array(temperatures.length).fill(0);
    for (let i = 0; i < temperatures.length; i++) {
        // Mientras la temperatura en la última posición del stack sea menor que la temperatura saquelo
        // Y cómo estoy guardando indices entonces la respuesta en ese indice sera i - j
        while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
            // Mientras la temperatura actual sea mayor a las que hay en el stack, saque las temperaturas 
            // Dejando el stack ordenado de mayor a menor
            let j = stack.pop();
            answer[j] = i - j;
        }
        stack.push(i);
    }
    return answer;
}
;
// Monotonic decreasing
// Encontrar el elemento más grande en la ventana
var maxSlidingWindow = function (nums, k) {
    let ans = [];
    let queue = [];
    for (let i = 0; i < nums.length; i++) {
        // maintain monotonic decreasing.
        // all elements in the deque smaller than the current one
        // have no chance of being the maximum, so get rid of them
        while (queue.length && nums[i] > nums[queue[queue.length - 1]]) {
            queue.pop();
        }
        queue.push(i);
        // queue[0] is the index of the maximum element.
        // if queue[0] + k == i, then it is outside the window
        // Esto me mantiene los elementos dentro de la ventana
        if (queue[0] + k == i) {
            queue.shift();
        }
        // only add to the answer once our window has reached size k
        if (i >= k - 1) {
            ans.push(nums[queue[0]]);
        }
    }
    return ans;
};
// Encontrar la ventana más grande con la diferencia menor o igual al límite
/*  ESTRATEGIA
  Tener dos queue una incremental y una decremental:
    la incremental saber en la posición 0 el número menor
    la decremental saber en la posición 0 el número mayor
  Mientras el siguiente número sea menor al último número de la incremental, sacarlos hasta que se pueda meter
  Mientras el siguiente número sea mayor al último número de la decremental, sacarlos hasta que se pueda meter

  Calcular la ventana:
    Mientras el mayor(decremental[0]) - el menor(incremental[0]) > limit, quitar elementos
      Sé que el elemento que tengo que quitar están en el inicio de la ventana (left)
        Entonces numbs[left] pero lo tengo que quitar de cuál ventana? de dónde esté en la posición 0


*/
function longestSubarray(nums, limit) {
    // Given an array of integers nums and an integer limit, 
    // return the size of the longest non-empty subarray 
    // such that the absolute difference between any two elements of this subarray is less than or equal to limit.
    let increasing = [];
    let decreasing = [];
    let left = 0, ans = 0;
    for (let right = 0; right < nums.length; right++) {
        // maintain the monotonic deques
        // increasing stack
        while (increasing.length && increasing[increasing.length - 1] > nums[right]) {
            increasing.pop();
        }
        // decreasing stack
        while (decreasing.length && decreasing[decreasing.length - 1] < nums[right]) {
            decreasing.pop();
        }
        increasing.push(nums[right]);
        decreasing.push(nums[right]);
        // maintain window property
        while (decreasing[0] - increasing[0] > limit) {
            if (nums[left] == decreasing[0]) {
                decreasing.shift();
            }
            if (nums[left] == increasing[0]) {
                increasing.shift();
            }
            left++;
        }
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
}
;
console.log(longestSubarray([8, 2, 4, 7], 4));
