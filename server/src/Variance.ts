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