import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Mock user database
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

export async function GET(request: NextRequest) {
  try {
    const authToken = request.cookies.get('auth-token')?.value

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: 'Authentication token not found' },
        { status: 401 }
      )
    }

    // Verify token
    let decoded: any
    try {
      decoded = jwt.verify(authToken, JWT_SECRET)
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid authentication token' },
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

    // Return user data
    return NextResponse.json({
      success: true,
      message: 'User data retrieved successfully',
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
        lastLogin: new Date(),
      },
    })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
