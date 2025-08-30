import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    } & DefaultSession["user"]
    access_token?: string
    error?: string
  }

  interface User extends DefaultUser {
    id: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    access_token?: string
    refresh_token?: string
    expires_at?: number
    error?: string
    user?: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}
