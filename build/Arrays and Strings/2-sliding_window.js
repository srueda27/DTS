// Remember, the idea of a sliding window is to add elements by sliding to the right 
// until the window violates the constraint.
// Involving subarrays - Datos contiguos/uno al lado del otro
/* // Primer tipo de problemas
    // Tiene restricciones de metrica para saber si un subarreglo es válido. Ejemplo la suma
    // Tiene una restricción numérica en la restricción de métrica. La suma menor o igual a 10
      // Digamos que el problema declara un subarreglo es válido si su suma es menor a 10
*/
/* // Segundo
    // El problema te pedirá encontrar subarreglos válidos de alguna manera
*/
/*
Find the longest subarray with a sum less than or equal to k
Find the longest substring that has at most one "0"
Find the number of subarrays that have a product less than k
*/
// Addicionar elementos aumenta la ventana right++
// Quitar elementos disminuye la ventana left--
/*
function fn(arr):
    left = 0
    for (int right = 0; right < arr.length; right++):
        Do some logic to "add" element at arr[right] to window

        while WINDOW_IS_INVALID:
            Do some logic to "remove" element at arr[left] from window
            left++

        Do some logic to update the answer
*/
// right - left + 1 SIZE OF THE WINDOW
function sliding_window(arr) {
    let left = 0;
    for (let right = 0; right < arr.length; right++) {
        // Lógica para ampliar la ventana con arr[right]
        while ('Window is invalid') {
            // lógica para remover arr[left]
            left++;
        }
        // lógica para actualizar respuesta
    }
}
function findLength(str) {
    let left = 0;
    let result = 0; // El tamaño de la ventana 
    let curr = 0; // The numeric restriction or the condition to valid/invalid substring
    for (let right = 0; right < str.length; right++) {
        if (str[right] == '0') {
            curr++;
        }
        while (curr > 1) {
            if (str[left] == '0') {
                curr--;
            }
            left++;
        }
        if (result < right - left + 1) {
            result = right - left + 1;
        }
        // result = Math.max(result, right - left + 1)
    }
    return result;
}
;
console.log(findLength("1101100111"));
/* var findLength = function(nums, k) {
  // curr is the current sum of the window
  let left = 0, curr = 0, ans = 0;
  for (let right = 0; right < nums.length; right++) {
      curr += nums[right];
      while (curr > k) {
          curr -= nums[left];
          left++;
      }
      
      ans = Math.max(ans, right - left + 1);
  }
  
  return ans;
} */
function numSubarrayProductLessThanK(nums, k) {
    // Encuentre el número de subarreglos que el producto de su elementos sea menor que k
    // sume ventanas
    if (k <= 1)
        return 0;
    let left = 0;
    let ans = 0;
    let curr = 1;
    for (let right = 0; right < nums.length; right++) {
        curr *= nums[right];
        while (curr >= k) {
            curr = curr / nums[left];
            left++;
        }
        ans += right - left + 1;
    }
    return ans;
}
// El subarreglo más pequeño dónde los números sea igual o mayor que el target
function minSubArrayLen(target, nums) {
    if (target <= 1)
        return 0;
    let left = 0;
    let ans = Infinity;
    let curr = 0;
    for (let right = 0; right < nums.length; right++) {
        curr += nums[right];
        while (curr >= target) {
            ans = Math.min(right - left + 1, ans);
            curr = curr - nums[left];
            left++;
        }
    }
    return ans == Infinity ? 0 : ans;
}
;
// Fixed Window
// function fn(arr, k):
// curr = some data to track the window
// // build the first window
// for (int i = 0; i < k; i++)
//     Do something with curr or other variables to build first window
// ans = answer variable, probably equal to curr here depending on the problem
// ans = curr
// for (int i = k; i < arr.length; i++)
//     Add arr[i] to window
//     Remove arr[i - k] from window
//     Update ans
// return ans
function subarr(arr, k) {
    let curr = 0;
    for (let i = 0; i < k; i++) {
        curr += arr[i];
    }
    let ans = curr;
    for (let i = k; i < arr.length; i++) {
        curr += arr[i];
        curr -= arr[i - k];
        ans = Math.max(ans, curr);
    }
    console.log(ans);
}
// subarr([3,-1,4,12,-8,5,6], 4)
