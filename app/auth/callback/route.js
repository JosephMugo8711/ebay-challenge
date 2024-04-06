import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// Define a GET function to handle GET requests
export async function GET(request) {
  // Parse the request URL
  const requestUrl = new URL(request.url)
  // Get the 'code' parameter from the URL query string
  const code = requestUrl.searchParams.get('code')

  // If the 'code' parameter is present in the URL
  if (code) {
    // Create a Supabase client using cookies from the request headers
    const supabase = createRouteHandlerClient({ cookies })
    // Exchange the 'code' for a session token
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirect to the origin URL after the sign-in process completes
  return NextResponse.redirect(requestUrl.origin)
}
