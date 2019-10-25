/**
 * Type level code: is the code that consist exclusivery of types and type operators, it's a valid typescript
 * Value level code: it's a valid javascript code
 */
function area(radius: number): number | null {
  if(radius < 0) {
    return null
  }
  return Math.PI * (radius ** 2)
}

let r: number = 3
let a = area(r)
if(a !== null) {
  console.info('result:', a)
}

type Log = (message: string, userId?: string) => void

let log: Log = (
  message,
  userId = 'Not signed in'
) => {
  let time = new Date().toISOString()
  console.log(time, message, userId)
}

// Contextual typing
function times( f:(index: number) => void, n: number) {
  for(let i = 0; i < n; i++) {
    f(i)
  }
}

times(n => console.log(n), 4)

// Overloaded function types
 /** Shorthand call signature */
 type Logs = (message: string, userId?: string) => void
 /** Full call signature */
 type Logs = {
   (message: string, userId?: string): void
 }

 /**
  * Overloaded function: a function with multiple call signatures
  */

  