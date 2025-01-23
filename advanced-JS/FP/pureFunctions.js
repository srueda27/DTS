//Pure functions should have this 2 --So... in reality doesn't exists
/* 
  No side effects --modify the least posible
  Should not modify any of the elements outside itself --- Copy elements
*/
// Referencial Transparency -- Giving the same parameters always give the same output


const array = [1,2,3]
function removeLastItem(arr) {
  const newArr = [...arr];
  newArr.pop()

  return newArr //The original arr stays the same after runing this function
}

removeLastItem(array);

/* Rules for functions
  1. Just 1 Task
  2. Always return statement
  3. As pure as possible
  4. No shared state with other functions
  5. Immutable State -- Always return a copy of the original obj
  6. Composable --
  7. Predictable 
 */