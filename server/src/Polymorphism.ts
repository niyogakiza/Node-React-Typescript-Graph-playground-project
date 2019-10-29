/** Concrete types
 * boolean
 * string
 * Date[]
 * {a:number} | {b:string}
 * (numbers: number[]) => number
 */

 function filter(array, f) {
   let result = []
   for(let i = 0; i < array.length; i++) {
     let item = array[i]
     if(f(item)) {
       result.push(item)
     }
   }
   return result
 }
 filter([1, 2, 3, 4], _=>_ < 3)

 type Filters = {
   (array: number[], f:(item: number) => boolean): number[]
   (array: string[], f:(item: string) => boolean): string[]
   (array: object[], f:(item: object) => boolean): object[]
 }

 let names = [
   { firstName: 'Beth'},
   { firstName: 'Bob'},
   { firstName: 'John'}
 ]

 let result = filter(names, _=>_.firstName.startsWith('b'))

 /** Generic type parameter
  * A placeholder type used to enforce a type-level contraint in
  * multiple places. also known as polymorphic type parameter
  */

  // With Generic type
  type Filter ={
    <T>(array: T[], f:(item: T) => boolean): T[]
  } 
  
  let filters: Filter = (array, f) => {
    let result = []
    for(let i = 0; i < array.length; i++) {
      let item = array[i]
      if(f(item)) {
        result.push(item)
      }
    }
    return result
  }

  filters([1, 2], _=>_  > 2) // let filters: <number>(array: number[], f: (item: number) => boolean) => number[]
  filters(['a', 'b'], _=>_ !== 'b') // let filters: <string>(array: string[], f: (item: string) => boolean) => string[]
  filters(names, _=>_.firstName.startsWith('b')) 

  type Guard<A> = {
    (array: A[], f:(item: A) => boolean): A[]
  }
  /**
   * 
   * @param array 
   * type Guard<A> = (array: A[], f: (item: A) => boolean) => A[] Generic type 'Guard' requires 1 type argument(s).ts
   * * *(2314)
   * @param j 
   */
  let guard: Guard = (array, j) => {}
  /**
   * 
   * @param array 
   * Type '(array: number[], j: (item: number) => boolean) => void'
   * @param j 
   */
  let guard: Guard<number> = (array, j) => {}
  /**
   * 
   * @param array 
   * Type '(array: string[], j: (item: string) => boolean) => void'
   * @param j 
   */
  let guard: Guard<string> = (array, j) => {}

  /**
   * map: U for the type of the array members going in V for the type of the array members going out
   */

   function map<U, V>(array: U[], f:(item: U) => V ): V[] {
     let result = []
     for(let i=0; i < array.length; i++) {
       result[i] = f(array[i])
     }
     return result
   }

   /**
    * Bounded Polymorphism
    */

    type TreeNode = {
      value: string
    }

    type LeafNode = TreeNode & {
      isLeaf: true
    }

    type InnerNode = TreeNode & {
      children: [TreeNode] | [TreeNode, TreeNode]
    }
    let c: TreeNode = { value: 'c'}
    let d: LeafNode = { value: 'd', isLeaf: true} 
    let e: InnerNode = { value: 'e', children: [d]}

    let c1 = mapNode(c, _=>_.toUpperCase())
    let d1 = mapNode(d, _=>_.toUpperCase())
    let e1 = mapNode(e, _=>_.toUpperCase() )

    /** By saying that W extends TreeNode, we get to preserve the input
     * node's specific type(TreeNode, LeafNode or InnerNode), even after mapping it.
     */
    function mapNode<W extends TreeNode>(
      node: W,
      f: (value: string) => string
    ): W {
      return {
        ...node,
        value: f(node.value)
      }
    }

    /** Model arity */

    function fill(length: number, value: string): string[] {
      return Array.from({ length }, () => value)
    }
    function call<X extends unknown[], Y>(
      f: (...args: X) => Y,
      ...args: X
    ): Y {
      return f(...args)
    }

    let k = call(fill, 10, 'a') 
    // Expected 3 arguments, but got 2
    let g = call(fill, 10) 
    //Expected 3 arguments, but got 4.
    let j = call(fill, 10, 'd', 'x')

    /** Type-drive development
     *  A style of programming where you sketch out type
     * signatures first, and fill in values later
     */