import { func } from "prop-types";

// void: is the return of a function that doesn't explicitly return anything
// never: is the type of function that never returns at all

// function a(x: number): number
function a(x:number){
  if(x < 10) {
    return x
  }
  return null
}

// function b(): any
function b(){
  return undefined
}

// function c(): void
function c(){
  let a = 2 + 2
  let b = a * a
}

// returns never
function d(){
  throw TypeError('I always error')
}

/**
 * null : Absence of a value
 * undefined : Variable that has not been assigned a value yet
 * void  : function that doesn't have a return statement
 * never : function that never returns
 */