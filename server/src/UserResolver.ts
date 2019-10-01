import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx } from 'type-graphql'
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { User } from './entity/User'
import { MyContext } from './MyContext'

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
}

@Resolver()
export class UserResolver {
  @Query(() => String) // means that the query will return a string
  Server() {
    return 'hi'
  }

  @Query(() => [User])
  users() {
    return User.find()
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const hashedPassword = await hash(password, 12)
    try {
      await User.insert({
        email,
        password: hashedPassword
      })
    } catch (err) {
      console.log(err)
      return false
    }
    return true
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ) : Promise<LoginResponse> {
    const user = await User.findOne({ where: { email }});
    if(!user) throw new Error('Could not find the user')
    const valid = await compare(password, user.password)
    if(!valid) throw new Error('Password did not match')
    // login successful
    /**
     * Refresh token
     */
    res.cookie(
      "aiam",
      sign({
        userId: user.id, 
      }, 'asdasdasdsdsd', {
        expiresIn: '30d'
      }),
      {
        httpOnly: true,
      }
    )
    /**
     * Create token
     */
    return {
      accessToken: sign({
        userId: user.id, 
      }, 'asdasdasd', {
        expiresIn: '15m'
      })
    }
  }
}