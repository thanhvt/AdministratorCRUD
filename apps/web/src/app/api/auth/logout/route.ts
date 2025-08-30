import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.access_token) {
      return NextResponse.json(
        { success: false, message: 'No active session found' },
        { status: 401 }
      )
    }

    // Logout from Keycloak
    try {
      const endSessionURL = new URL(process.env.END_SESSION_URL!)
      endSessionURL.searchParams.set('id_token_hint', session.access_token)

      await fetch(endSessionURL.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      })
    } catch (keycloakError) {
      console.error('Keycloak logout error:', keycloakError)
      // Continue with local logout even if Keycloak logout fails
    }

    // Clear local session cookies
    const response = NextResponse.json({
      success: true,
      message: 'Logout successful',
    })

    // Clear NextAuth cookies
    response.cookies.delete('next-auth.session-token')
    response.cookies.delete('next-auth.csrf-token')
    response.cookies.delete('next-auth.callback-url')
    response.cookies.delete('__Secure-next-auth.session-token')
    response.cookies.delete('__Secure-next-auth.csrf-token')
    response.cookies.delete('__Secure-next-auth.callback-url')

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 500 }
    )
  }
}
