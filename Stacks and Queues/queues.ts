// Shift para remover el primer elemento
// push para insertar al final 
// Siguen el orden FIFO 
// [1, 2] push(4) => [1, 2, 4] shift() => [2, 4]

class MovingAverage {
  queue: number[]
  sum: number
  size: number
  constructor(size: number) {
    this.queue = []
    this.size = size
    this.sum = 0
  }

  next(val: number): number {
    if (this.queue.length == this.size) {
      this.queue.shift()
    }

    this.sum += val
    this.queue.push(val)

    return this.sum / this.queue.length
  }
}


const arr = [1, 2, 3]
const abc = arr.shift()

console.log(arr)
console.log(abc)