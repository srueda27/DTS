// set an assembly line of results
// data ==> fn ==> data ==> fn ==> 

// Compose: any data transformation should be obvious
  // goes right to lef: g then f

const compose = (f,g) => (data) => f(g(data));

const multiplyBy3 = num => num * 3;
const makePositive = num => Math.abs(num);

const multiplyBy3AndMakePositive = compose(multiplyBy3,makePositive);

multiplyBy3AndMakePositive(-60); // ==> 180

// Pipe same as compose
  // goes left to right: f then g