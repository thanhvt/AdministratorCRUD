import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your-refresh-secret'

// Mock user database (same as login)
const mockUsers = [
  {
    id: '1',
    email: 'admin@banking.com',
    name: 'Administrator',
    role: 'admin' as const,
    permissions: ['read', 'write', 'delete', 'admin'],
  },
  {
    id: '2',
    email: 'trader@banking.com',
    name: 'John Trader',
    role: 'trader' as const,
    permissions: ['read', 'write', 'trading'],
  },
  {
    id: '3',
    email: 'user@banking.com',
    name: 'Jane User',
    role: 'user' as const,
    permissions: ['read'],
  },
]

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refresh-token')?.value

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: 'Refresh token not found' },
        { status: 401 }
      )
    }

    // Verify refresh token
    let decoded: any
    try {
      decoded = jwt.verify(refreshToken, REFRESH_SECRET)
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid refresh token' },
        { status: 401 }
      )
    }

    // Find user
    const user = mockUsers.find(u => u.id === decoded.userId)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 401 }
      )
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '15m' }
    )

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Token refreshed successfully',
    })

    // Set new access token cookie
    response.cookies.set('auth-token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Token refresh error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
