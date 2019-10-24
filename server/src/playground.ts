import { func } from "prop-types"

// Union and intersection types
type Cat = {
  name: string,
  purrs: boolean
}

type  Dog = {
  name: string,
  barks: boolean,
  wags: boolean
}

type catOrDogOrBoth = Cat | Dog
type catAndDog = Cat & Dog

// Cat 
let a: catOrDogOrBoth = {
  name: 'Bonkers',
  purrs: true
}

// Dog
a = {
  name: 'Domino',
  barks: true,
  wags: true
}
// both
a = {
  name: 'Donkers',
  barks: true,
  purrs: true,
  wags: true
}

let b: catAndDog = {
  name: 'Domino',
  barks: true,
  purrs: true,
  wags: true
}

function trueOrNull(isTrue: boolean) {
  if(isTrue) return 'true'
  return null
}

type Returns = string | null

function aOrb(a: string, b:number) {
  return a || b
}