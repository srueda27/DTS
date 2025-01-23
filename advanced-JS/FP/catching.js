/* 
    use closure to store data in "cache" to be used later on
    with the same input 
*/

function addTo80(n) {
  console.log('long time');
  return n + 80;
}

let cache = {};
function memoizedAddTo80(n) {
  if(n in cache) { //same that doing cache.n to check if the property exists
    return cache.n
  } else {
    const value = addTo80(n);
    cache[n] = value;
    return value
  }
}

function memoize(fn) {
  let cache = {}
  return function(...args) {
    if(cache[args]) {
      return cache[args]
    } else {
      const value = fn.apply(this, args);
      cache[args] = value;
      return value
    }
  }
}