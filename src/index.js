import shipFactory from './ship'


const obj = shipFactory(3)
obj.getHit(0)
obj.getHit(1)
obj.getHit(2)
console.log(obj.isSunk)