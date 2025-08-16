# Next.js 15 Application with Docker Compose

A modern, production-ready Next.js 15 application with comprehensive admin panel, authentication, and content management system.

## 🚀 Features

### Core Technologies

- **Next.js 15.4.6** - App Router with server/client components
- **React 18** - Latest React features with TypeScript
- **Node.js 22.15.0** - Latest LTS version
- **Yarn 4.9.2** - Modern package manager with Plug'n'Play
- **TypeScript** - Full type safety throughout the application

### Authentication & Authorization

- **NextAuth.js** - Secure authentication with role-based access control
- **Role-based permissions** - ADMIN/USER roles with middleware protection
- **Secure password hashing** - bcryptjs for password security
- **Session management** - JWT-based sessions with custom callbacks

### Database & Backend

- **Prisma ORM** - Type-safe database operations
- **SQLite** - Development database (easily configurable for PostgreSQL/MySQL)
- **Database seeding** - Sample data for development and testing
- **Server Actions** - Next.js 15 server-side form handling

### Admin Panel

- **Complete CMS** - Full content management system
- **Post management** - Create, edit, publish blog posts with Markdown support
- **Page management** - Static page creation and management
- **User management** - Admin interface for user roles and permissions
- **Dashboard** - Analytics and quick actions overview

### Frontend & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Modern React component library
- **Heroicons** - Beautiful SVG icons
- **Dark mode support** - Built-in theme switching
- **Responsive design** - Mobile-first approach

### Content Management

- **MDX Support** - Markdown with React components
- **@next/mdx** - Modern MDX processing (migrated from Contentlayer)
- **Dynamic routing** - File-based routing with catch-all routes
- **SEO optimized** - Meta tags, sitemap, robots.txt

### Development & Deployment

- **Docker Compose** - Development and production environments
- **ESLint & Prettier** - Code quality and formatting
- **TypeScript strict mode** - Maximum type safety
- **Comprehensive Makefile** - Easy command management
- **Environment configuration** - Flexible environment setup

## 📋 Prerequisites

- **Node.js 22.15.0+** (use .nvmrc: `nvm use`)
- **Yarn 4.9.2+** (configured with Plug'n'Play)
- **Docker & Docker Compose** (for containerized development)

## 🛠️ Installation & Setup

### Quick Start

```bash
# Clone the repository
git clone https://github.com/riandoza/nextjs-compose.git
cd nextjs-compose

# Initial setup (installs deps, generates Prisma client, seeds database)
make setup
# or
yarn setup

# Start development server
make dev
# or
yarn dev
```

### Manual Setup

```bash
# Install dependencies
yarn install

# Generate Prisma client
yarn db:generate

# Push database schema
yarn db:push

# Seed database with sample data
yarn db:seed

# Start development server
yarn dev
```

## 🐳 Docker Development

### Development Environment

```bash
# Start development containers
make compose-dev
# or
yarn docker:dev

# View logs
make compose-logs
# or
yarn docker:logs

# Access container shell
make compose-shell
# or
yarn docker:shell
```

### Production Environment

```bash
# Build and start production containers
make compose-prod
# or
yarn docker:prod
```

## 📊 Database Management

```bash
# Run migrations
make db-migrate
yarn db:migrate

# Seed database
make db-seed
yarn db:seed

# Reset database (push schema + seed)
make db-reset
yarn db:reset

# Open Prisma Studio
make db-studio
yarn db:browser
```

## 🧪 Development Commands

```bash
# Development
make dev          # Start development server
make build        # Build for production
make preview      # Build and preview locally

# Code Quality
make lint         # Run ESLint
make format       # Format code with Prettier
make check        # Run all quality checks (lint + build + tests)

# Maintenance
make clean        # Clean build artifacts
yarn clean:all    # Clean everything including node_modules

# Docker
make compose-dev  # Start development environment
make compose-prod # Start production environment
make compose-stop # Stop containers
make compose-logs # View container logs
```

## 🔐 Default Admin Access

After running the database seed, you can access the admin panel:

- **URL**: http://localhost:3000/admin
- **Admin User**: admin@example.com / admin123
- **Test User**: user@example.com / user123

## 📁 Project Structure

```
├── src/
│   ├── app/                  # Next.js 15 App Router
│   │   ├── admin/           # Admin panel pages
│   │   ├── api/             # API routes
│   │   └── (routes)/        # Public pages
│   ├── components/          # React components
│   │   ├── admin/           # Admin-specific components
│   │   └── ui/              # Shadcn/UI components
│   ├── lib/                 # Utility libraries
│   └── types/               # TypeScript type definitions
├── prisma/                  # Database schema and migrations
├── docs/                    # Project documentation
├── docker-compose.yml       # Development Docker setup
├── docker-compose.prod.yml  # Production Docker setup
├── Makefile                 # Development commands
└── CLAUDE.md               # AI assistant context
```

## 🌟 Key Features

### Admin Panel

- **Dashboard**: User statistics, post counts, quick actions
- **Content Management**: Create/edit posts and pages with Markdown
- **User Management**: Role-based user administration
- **Role-based Access**: Secure middleware protection

### Content System

- **Dynamic Posts**: Database-driven blog posts with metadata
- **Static Pages**: Flexible page creation system
- **SEO Optimization**: Built-in meta tags and sitemap generation
- **MDX Support**: Markdown with React component integration

### Authentication

- **Secure Login**: Credential-based authentication
- **Role System**: ADMIN/USER roles with granular permissions
- **Protected Routes**: Middleware-based route protection
- **Session Management**: Secure JWT-based sessions

## 🔧 Configuration

### Environment Variables

```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Optional
NEXT_PUBLIC_DOMAIN="localhost"
ACCESS_TOKEN="session-token-name"
```

### Database Configuration

The application uses SQLite by default but can be easily configured for PostgreSQL or MySQL by updating the `prisma/schema.prisma` file and `DATABASE_URL`.

## 📚 Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Runtime** | Node.js | 22.15.0 |
| **Framework** | Next.js | 15.4.6 |
| **Frontend** | React | 18.x |
| **Language** | TypeScript | 5.x |
| **Package Manager** | Yarn | 4.9.2 |
| **Database** | Prisma + SQLite | 5.7.1 |
| **Authentication** | NextAuth.js | 4.x |
| **Styling** | Tailwind CSS | 3.x |
| **Components** | Shadcn/UI | Latest |
| **Icons** | Heroicons | 2.x |
| **Content** | @next/mdx | 15.x |
| **Containerization** | Docker | Latest |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Check the [documentation](docs/)
- Open an issue on GitHub
- Review the [CLAUDE.md](CLAUDE.md) file for AI assistant context

---

**Built with ❤️ using Next.js 15, TypeScript, and modern web technologies.**
