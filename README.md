# Banking Administration System - Monorepo

A secure, production-ready monorepo for banking administration and custody services built with Next.js, TypeScript, and modern tooling.

## 🏗️ Architecture

This monorepo uses **pnpm workspaces** and **Turborepo** for efficient package management and build orchestration.

### Project Structure

```
├── apps/
│   └── web/                    # Next.js application (main app)
├── packages/
│   ├── config/                 # Shared configurations (ESLint, TypeScript)
│   ├── ui/                     # Shadcn/UI components library
│   ├── services/               # Business logic & API services
│   └── modules/                # Banking modules
│       ├── securities/         # Portfolio & custody management
│       ├── trading/           # Order management & market data
│       └── user-settings/     # Profile & security settings
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.17.0
- pnpm >= 8.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Demo Credentials

- **Email**: `admin@banking.com`
- **Password**: `admin123`

## 🛠️ Available Scripts

```bash
# Development
pnpm dev          # Start all packages in development mode
pnpm build        # Build all packages
pnpm lint         # Lint all packages
pnpm type-check   # Type check all packages
pnpm clean        # Clean build artifacts

# Individual package commands
pnpm --filter @banking/web dev     # Run only web app
pnpm --filter @banking/ui build    # Build only UI package
```

## 📦 Packages

### `@banking/web`
Next.js application with App Router, featuring:
- JWT authentication with httpOnly cookies
- Route protection middleware
- Session timeout management
- Responsive dashboard

### `@banking/ui`
Shared UI components built with:
- Shadcn/UI
- Tailwind CSS
- Radix UI primitives
- TypeScript

### `@banking/services`
Business logic and services:
- Authentication service
- API client with automatic token refresh
- Zustand state management
- Session timeout hooks

### Banking Modules

#### `@banking/modules-securities`
- **Portfolio Management**: View and analyze investment portfolios
- **Custody Services**: Asset safekeeping and compliance reporting

#### `@banking/modules-trading`
- **Order Management**: Create, track, and cancel trading orders
- **Market Data**: Real-time quotes and market analytics

#### `@banking/modules-user-settings`
- **Profile Management**: User information and preferences
- **Security Settings**: [object Object]

- JWT-based authentication with refresh tokens
- HttpOnly cookies for token storage
- Session timeout with user activity tracking
- Route protection middleware
- CSRF protection
- Secure password management

## 🏢 Banking Features

### Securities Management
- Portfolio overview and analytics
- Custody account management
- Asset safekeeping reports
- Compliance monitoring

### Trading Operations
- Order placement and management
- Real-time market data
- Position tracking
- Trade execution monitoring

### User Administration
- Profile and preference management
- Security settings and 2FA
- Activity logging and audit trails
- Session management

## 🛡️ Environment Variables

Copy `.env.example` to `.env.local` in the `apps/web` directory:

```bash
# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
REFRESH_SECRET=your-super-secret-refresh-key-here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🔧 Development

### Adding New Packages

```bash
# Create new package
mkdir packages/new-package
cd packages/new-package
pnpm init

# Add to workspace (automatically detected)
```

### Code Quality

- **ESLint**: Shared configuration in `@banking/config`
- **TypeScript**: Strict mode enabled with shared base config
- **Prettier**: Code formatting
- **Husky**: Git hooks (if configured)

## 📚 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI + Radix UI
- **State Management**: Zustand
- **Build Tool**: Turborepo
- **Package Manager**: pnpm
- **Authentication**: JWT with httpOnly cookies

## 📄 License

This project is private and proprietary.
