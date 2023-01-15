function getNearestFibonacci(num) {
  if (num == 0) {
    return 1
  }

  let first = 0,
    second = 1
  let third = first + second

  while (third <= num) {
    first = second
    second = third
    third = first + second
  }

  return third - num > num - second ? second : third
}

function getNextFibonacci(num) {
  const value = (num * (1 + Math.sqrt(5))) / 2
  return Math.round(value)
}

const MIN_RATE = 3
export function getFibonacciRate(num = 0) {
  if (num) {
    const oldValue = Math.max(num, MIN_RATE)
    const nearest = getNearestFibonacci(oldValue)
    console.log(nearest)
    const minIncrease = 2
    return nearest - oldValue >= minIncrease ? nearest : getNextFibonacci(nearest)
  }
  return MIN_RATE
}
