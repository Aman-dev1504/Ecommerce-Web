import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
const { auth } = NextAuth(authConfig)

export const authRoutes = [
    '/auth/login',
    '/auth/register',
]

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
  
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  
    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl))
      }
      return
    }
  
    return
  })


export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  };