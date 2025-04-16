# RentEazy

A modern, full-stack property management platform built with Next.js 15, Drizzle ORM, and PostgreSQL. This application supports three user roles: renters, landlords, and property managers, providing a seamless experience for managing rental properties.

## Features

### For Renters

- Browse and search available properties
- Save favorite listings
- Submit rental applications
- Manage notification preferences
- Track application status
- View and pay rent
- Submit maintenance requests

### For Landlords

- List and manage properties
- Review rental applications
- Manage tenants
- Track rent payments
- Handle maintenance requests
- View property performance reports

### For Property Managers

- Manage multiple properties
- Handle tenant assignments
- Process rent payments
- Coordinate maintenance
- Generate performance reports
- Manage team members

## Tech Stack

- **Framework**: Next.js 15 with React Server Components
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better-Auth
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/property-management.git
   cd property-management
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Fill in the required environment variables in `.env`

4. Set up the database:

   ```bash
   pnpm db:push
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

## Project Structure

```
/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication routes
│   ├── (dashboard)/         # Protected dashboard routes
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/              # Reusable components
│   ├── ui/                 # UI components
│   ├── auth/               # Authentication components
│   └── accounts/           # Account management components
├── schema/                 # Drizzle ORM schema
├── actions/                # Server actions
├── lib/                    # Utility functions
└── public/                 # Static assets
```

## Database Schema

The application uses Drizzle ORM with PostgreSQL. Key tables include:

- `user`: User accounts and authentication
- `property`: Property listings and details
- `rentPayments`: Rent payment tracking
- `maintenanceTickets`: Maintenance request management
- `notificationPreferences`: User notification settings
- `userRole`: Role-based access control

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow Next.js 15 best practices
- Use React Server Components by default
- Implement proper error handling
- Write meaningful commit messages

### Database

- Use Drizzle ORM for all database operations
- Follow the schema rules in `drizzle.mdc`
- Run migrations before deploying changes

### Styling

- Use Tailwind CSS for styling
- Follow the Tailwind CSS v4 rules in `tailwindcss-best-pratices.mdc`
- Maintain consistent design patterns

## Deployment

The application is configured for deployment on Vercel:

1. Push your changes to the main branch
2. Vercel will automatically deploy the changes
3. Database migrations will run automatically

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email <support@example.com> or join our Slack channel.

## Acknowledgments

- Next.js team for the amazing framework
- Drizzle ORM team for the excellent database tooling
- shadcn/ui for the beautiful component library
