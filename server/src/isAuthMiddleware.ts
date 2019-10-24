import { MiddlewareFn } from "type-graphql";
import { MyContext } from "./MyContext";
import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<MyContext> = (({ context }, next) => {
  const authorization = context.req.headers['authorization']

  if(!authorization) {
    throw new Error('not authenticated')
  }
  try{
    const token = authorization.split(" ")[1]
    const payload = verify()
  }catch {

  }
  return next()
})