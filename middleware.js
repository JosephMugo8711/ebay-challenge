import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
// Import the NextResponse object from the 'next/server' module
import { NextResponse } from 'next/server'

// Define a middleware function for authentication
export async function middleware(req) {
    // Create a new NextResponse object
  const res = NextResponse.next()
  // Create a Supabase client using the createMiddlewareClient function and pass the request and response objects
  const supabase = createMiddlewareClient({ req, res })
   // Retrieve the session data from Supabase
  const { data } = await supabase.auth.getSession()

  // If there is a session and the request path starts with '/auth', redirect to the home page or main page
  if (data?.session && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  //  if no session
  // Redirect to the '/auth' page if there is no session and the request path requires authentication
  if (
    !data?.session && (
    req.nextUrl.pathname.startsWith('/checkout') ||
    req.nextUrl.pathname.startsWith('/success') ||
    req.nextUrl.pathname.startsWith('/orders') ||
    req.nextUrl.pathname.startsWith('/address')
  )) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return res
}

// Will get sent away from authentication page because i already have a session / logged in
// Get redirected away from there