
const reduce = (fns, init) => {
  return new Promise(resolve => {
    fns.reduce((accumulator, currentValue) => {
      return accumulator.then(currentValue) 
    }
    ,
    init)
  })
}

const fn1 = () => new Promise((resolve, reject) => {
    return resolve(3);
});

const result = await reduce(
[
  fn1(),
  fn1()
]
, 
new Promise(()=>{ return 3 })
) 

console.log(result)

