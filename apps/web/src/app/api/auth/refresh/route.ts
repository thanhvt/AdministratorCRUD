import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.refresh_token) {
      return NextResponse.json(
        { success: false, message: 'No refresh token available' },
        { status: 401 }
      )
    }

    // Refresh token with Keycloak
    try {
      const response = await fetch(process.env.REFRESH_TOKEN_URL!, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.FRONTEND_CLIENT_ID!,
          client_secret: process.env.FRONTEND_CLIENT_SECRET!,
          grant_type: "refresh_token",
          refresh_token: session.refresh_token as string,
        }),
        method: "POST",
      })

      const tokens = await response.json()

      if (!response.ok) {
        throw new Error(tokens.error || 'Token refresh failed')
      }

      return NextResponse.json({
        success: true,
        message: 'Token refreshed successfully',
        data: {
          access_token: tokens.access_token,
          expires_in: tokens.expires_in,
        },
      })
    } catch (refreshError) {
      console.error('Keycloak token refresh error:', refreshError)
      return NextResponse.json(
        { success: false, message: 'Token refresh failed' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Token refresh error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
