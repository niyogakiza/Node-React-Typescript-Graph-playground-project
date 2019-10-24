let a = [1, 2, 3] 
let b = ['a', 'b']
let c: string[] = ['a']
let d = [1, 'a']

d.map(_ => {
  if(typeof _ === 'number') {
    return _ * 3
  }
  return _.toUpperCase()
})
console.log(d)
const e = [2, 'b']

let f = ['red']
f.push('blue')
// f.push(true)

let g = []
g.push(1)
g.push('red')
g.push(true)
g.push(0.4)
g.push({ name: 'hehe'})

let h:number[] = []
h.push(1)
h.push(0.5)
// h.push(true)
// h.push('red')

function buildArray(){
  let a = []
  a.push(1)
  a.push('allo')
  return a
}

let myArray = buildArray() // (string | number)[]
// myArray.push(true) // Argument of type 'true' is not assignable to parameter of type 'string | number'.

