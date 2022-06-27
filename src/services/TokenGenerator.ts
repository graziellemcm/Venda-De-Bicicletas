import * as jwt from "jsonwebtoken"

export class TokenGenerator {
    generateToken(
      payload: authenticationData
   ): string {
      return jwt.sign(
         payload,
         `${process.env.JWT_KEY}` as string,
         {
            expiresIn: "24min"
         }
      )
   }

   getTokenData(
      token: string
   ): authenticationData {
      return jwt.verify(
         token,
         `${process.env.JWT_KEY}` as string
      ) as authenticationData
   }
}

export type authenticationData = {
  id: string
}