/* 
  A promise is an object that may produce a single value
  some time in the future 

  Either a resolved value, or a reson that it's not resolved(rejected)

  //states
    fullfilled
    rejected
    pending

  Previously the promise were made by callbacks
*/

//create a Promise ==> new Promise((resolve, rejected) => {})
const promise = new Promise((resolve, reject) => {
  
  if(true) {
    resolve('Stuff worked!');
  } else {
    reject('Error, it broke');
  }
})

//If the promise it's resolved, grab the results from (resolve()) and do something
promise.then(results => console.log(results))

//More exercise
promise
  .then(result => result + '!')
  .then(result2 => {
    throw Error;
    console.log(result2)
  })
  .catch(() => console.log('Error!'))


//-------------------------------------------


const promise = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'HIII') //resolve in 100 miliseconds with 'HIII'
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'WAIT') //resolve in 1 second with 'WAIT'
})

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, 'BAII') //resolve in 2 seconds with 'BAII'
})

Promise.all([promise, promise2, promise3])
  .then(values => {
    console.log(values) //will be returned in order (1,2,3), but until all are resolved doesn't run
  })


//-------------------------------------------


