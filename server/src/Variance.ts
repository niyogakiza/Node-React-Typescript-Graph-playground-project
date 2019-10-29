type ExistingUser = {
  id: number,
  name: string
}

type NewUser = {
  name: string
}

function deleteUser(user: { id?: number, name: string }) {
  delete user.id
}

let existingUser: ExistingUser = {
  id: 232323,
  name: 'Ima User'
}

/** Type safety issue, typescript doesn't recognise
 *  that id has been deleted, it still think that id is
 * of the type number !
 * so using object type in a place of where it expects
 * it's supertype can be unsafe 
 * */
deleteUser(existingUser)

/**   Assign an object to a place where it's subtype is expected */

type LegacyUser = {
  id?: number | string,
  name: string
}

let legacyUser: LegacyUser = {
  id: '87798',
  name: 'John'
}
/**Types of property 'id' are incompatible.
 * Type 'string | number | undefined' is not assignable to type 'number | undefined'.
 * Type 'string' is not assignable to type 'number | undefined'. */
deleteUser(legacyUser)

/** You can not pass a shape with property types that are
 * supertypes of their expected types
 */

/** Variance types
 * Invariance: You want exactly a T. (type)
 * Covariance: You want a <: T(subtype)
 * Contravariance: You want  a >:T (supertype)
 * Bivariance: You are ok with either <:T or >:T
 */

 /** Assignability
  * Rule 1: Just the definition of what a subtype is:
  * if A is subtype of B, then wherever you need  a B
  *  you can also use an A 
  */

  /** Type Widening */

  const h = 'x'
  let b = h
  const c: 'h' = 'h'
  let d = c
  let h  = null
  h = 3
  h = 'b'
  function x() {
    let h = null,
    h = 3,
    h = 'b'
    return h
  }
  x() // function x(): null was supposed to be string?!

  let z = {x: 3}
  let l = {x: 3}
  // make it readonly 
  let p = {x: 3} as const // let p: {readonly x: 3;}

  // for nested data structures
  let w = [1, {x: 2}] // let w: (number | {x: number;})[]
  let t = [1, {x: 2}] as const // let t: readonly [1, {readonly x: 2;}]
  /**NB: Use as const when you want typescript to infer
   * your type as narrowly as possible
   */

   /** Excess property checking */

   interface Options {
     baseURL: string,
     cacheSize?: number,
     tier?: 'prod' | 'dev'
   }

   class API {
     constructor(private options: Options){}
   }

   new API({
     baseURL: 'https://api.site.com',
     tier: 'prod'
   })

   new API({
     baseURL: 'https://api.site.com',
     bad: 'prod' // Object literal may only specify known properties, and 'bad' does not exist in type 'Options'
   })

   new API({
    baseURL: 'https://api.site.com',
    bad: 'prod'
   } as Options) // Type assertion " as "
   
   let badOptions = {
     baseURL: 'https://api.site.com',
     badTier: 'prod'
   }
   new API(badOptions) // Typescript no longer considers to be fresh and bails out of excess property checking: no error

   let options: Options = {
     baseURL: 'https://api.site.com',
     badTier: 'prod' // Object literal may only specify known properties, and 'badTier' does not exist in type 'Options'
   }
   new API(options)

   /** Refinement */
   // | : union
   type Unit = 'cm' | 'px' | '%'

   // Enumarate the units
   let units: Unit[] = ['cm', 'px', '%']

   function parseUnit(value: string): Unit | null {
     for(let i = 0; i < units.length; i++) {
       if(value.endsWith(units[i])) {
         return units[i]
       }
     }
     return null
   }

   type Width = {
     unit: Unit,
     value: number
   }

   function parseWidth(width: number | string | null | undefined): Width | null {
     // if width is null or undefined return early so width it can't be null or undefined
     if(width == null) return null
     if(typeof width == 'number') {
       return {
         unit: 'px',
         value: width
       }
     }
     let unit = parseUnit(width)
     if(unit) {
       return {
         unit,
         value: parseFloat(width)
       }
     }
     return null // in case string will not be supported by unit.
   }

   /** Totality */

   type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
   type Day = Weekday | 'Sat' | 'Sun'

   function getNextDay(w: Weekday): Day { 
     // Function lacks ending return statement and return type does not include 'undefined'
     switch(w) {
       case 'Mon': return 'Tue'
     }
   }
