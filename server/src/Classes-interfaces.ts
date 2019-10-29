type Color = 'Black' | 'White'
type Doc = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' 
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

class Position {
  constructor(
    private doc: Doc,
    private rank: Rank
  ){}
  distanceFrom(position: Position) {
    return {
      rank: Math.abs(position.rank - this.rank),
      doc: Math.abs(position.doc.charCodeAt(0) - this.doc.charCodeAt(0))
    }
  }
}

abstract class Piece {
  // abstract: Means you can't instantiate the class directly, but it doesn't mean you can't define some methods on it
  // Protected: Accessible from instances of this class and its subclasses
  protected position: Position
  constructor(
    private readonly color: Color,
    doc: Doc,
    rank: Rank
  ){
    this.position = new Position(doc, rank)
  }
  moveTo(position: Position) {
    this.position = position
  }
  abstract canMoveTo(position: Position): boolean
}

class King extends Piece {
  canMoveTo(position: Position) {
    let distance = this.position.distanceFrom(position)
    return distance.rank < 2 && distance.doc < 2
  }
}

class Game {
  private pieces = Game.makePieces()
  private static makeGamePieces() {
    return [
      new King('White', 'E', 1),
      new King('Black', 'E', 8),
    ]
  }
}

/** Interfaces */

interface Suchi {
  calories: number,
  salty: boolean,
  tasty: boolean
}

type Food = {
  calories: number,
  tasty: boolean
} 

type Suchies = Food & {
  salty: boolean
}

type cake = Food & {
  sweet: boolean
}

interface Foods {
  calories: number,
  tasty: boolean
}

interface Suchis extends Foods {
  salty: boolean
}

interface Cakes extends Foods {
  sweet: boolean
}

// NB: interface can extend any type
/** Difference between interface and type */

// Can't write next types as interfaces
type A = number
type B = A | string

interface AC {
  good(x: number): string,
  bad(x: number): string
}

interface BC extends AC { // Interface 'BC' incorrectly extends interface 'AC'.
  good(x:string | number): string
  bad(x: string ): string
}

// Multiple interface with the same name in the same scope are automaticaly merged
/** Declaration merging
 * Automaticaly combining multiple 
 * declarations that are the same name but in case are duplication
 * they must keep the same type.
 */

 interface User {
   name: string
   age: string 
 }

 interface User {
   age: number // Subsequent property declarations must have the same type.  Property 'age' must be of type 'string', but here has type 'number'.ts(
 }

 /**All declarations of 'User' must have identical type parameters.ts(2428) */
 interface User<Age extends number> {
   age: age 
 }

 interface User<Age extends string> {
   age: Age 
   /**Subsequent property declarations must have the same type.
    *   Property 'age' must be of type 'string',
    *  but here has type 'Age'.ts(2717)
   */
 }

 let ab: User = {
   name:'Ash',
   age: 30
 }
 // Types aliases

 type Users = { // Duplicate identifier 'User'.ts(2300)
   name: string
 }

 type Users = { // Duplicate identifier 'User'.ts(2300)
   name: string
 }

 /** Implementations */

 interface Animal {
   eat(food: string): void
   sleep(hours: number): void
 }

 class Cat implements Animal {
   eat(food: string) {
     console.log('Ate some', food, '. mmm!')
   }
   sleep(hours: number) {
     console.info('Slept for', hours, 'hours')
   }
 }
 /** Interface can declare instance properties
  * but they can't declare visibility modifiers
  * (private, protected and public) and they can't
  * use static keyword, also mark instance properties 
  * as readonly
  */
 /** You can have unlimited interface implementations */

interface Feline {
  meow(): void
}

class Cats implements Animal, Feline {
  name = 'Whiskers'
  eat(food: string) {
    console.info('Ate some', food)
  } 
  sleep(hours: number) {
    console.info('Slept for', hours)
  }
  meow() {
    console.info('Meow')
  }
}