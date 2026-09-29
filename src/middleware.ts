import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isProtected = req.nextUrl.pathname.startsWith('/account') || req.nextUrl.pathname.startsWith('/orders')
  
  if (isProtected && !req.auth) {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
