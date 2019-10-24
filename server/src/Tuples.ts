import { number } from "prop-types";

let trainFares: [number, number?][] = [
  [3.75],
  [8.25, 7.70],
  [10.50]
]
let freinds: [string, ...string[]] = ['Sara', 'Tali', 'Chloe', 'Claire']

// A heterogeneous list
let list: [number, boolean, ...string[]] = [1, true, 'a', 'b', 'c']

// Read only arrays and tuples
let as: readonly number[] = [1, 2, 3, 4]
// mutate by using nonmutating methods
let bs: readonly number[] = as.concat(4)
let three = bs[2]
as[3] = 5 // Index signature in type 'readonly number[]' only permits reading
as.push(8) // Property 'push' does not exist on type 'readonly number[]'.

// Declaring readonly arrays and tuples
type A = readonly string[]
type B = ReadonlyArray<string>
type C = Readonly<string[]>
type D = readonly[number, string]
type E = Readonly<[number, string]>



