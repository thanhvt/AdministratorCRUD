import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your-refresh-secret'

// Mock user database
const mockUsers = [
  {
    id: '1',
    email: 'admin@banking.com',
    password: 'admin123', // In real app, this would be hashed
    name: 'Administrator',
    role: 'admin' as const,
    permissions: ['read', 'write', 'delete', 'admin'],
  },
  {
    id: '2',
    email: 'trader@banking.com',
    password: 'trader123',
    name: 'John Trader',
    role: 'trader' as const,
    permissions: ['read', 'write', 'trading'],
  },
  {
    id: '3',
    email: 'user@banking.com',
    password: 'user123',
    name: 'Jane User',
    role: 'user' as const,
    permissions: ['read'],
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = mockUsers.find(u => u.email === email && u.password === password)
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
      { userId: user.id },
      REFRESH_SECRET,
      { expiresIn: '7d' }
    )

    // Prepare user data (without password)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
      lastLogin: new Date(),
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userData,
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    })

    // Set httpOnly cookies
    response.cookies.set('auth-token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    })

    response.cookies.set('refresh-token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
