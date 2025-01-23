/* 
  3 ways of running promises
    parallel    ==> run promises at the same time, and wait for all
    sequencial  ==> run promises one after the other
    race        ==> run promises and which ever comes first will execute and forget the other 
*/

const promisify = (item, delay) => 
  new Promise(resolve => 
    setTimeout(() => resolve(item), delay)
  )

const a = () => promisify('a', 100);
const b = () => promisify('b', 5000);
const c = () => promisify('c', 3000);

// -----Parallel-----
async function parallel() {
  const promises = [a(), b(), c()];

  const [output1, output2, output3] = await Promise.all(promises);

  return `parallel is done: ${output1} ${output2} ${output3}`
}

parallel().then(data => console.log(data))


// -----Race-----
async function race() {
  const promises = [a(), b(), c()];

  const output = Promise.race(promises);

  return `race is done: ${output}`
}

race().then(data => console.log(data))


// -----Sequencial-----
async function sequencial() {
  const dataA = await a();
  const dataB = await b();
  const dataC = await c();

  return `Finish sequencial ${dataA} ${dataB} ${dataC}`  
}

