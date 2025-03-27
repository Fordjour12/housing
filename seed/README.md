# Database Seed Scripts

This directory contains scripts for seeding the database with initial data.

## Available Seeds

- **Roles**: Seeds the `role` table with predefined roles (renter, landlord, property_manager, admin) and their permissions.

## How to Run

To run all seed scripts:

```bash
pnpm db:seed
```

This will execute the main seed script (`index.ts`) which runs all individual seed functions in sequence.

## Adding New Seeds

To add a new seed script:

1. Create a new file in this directory (e.g., `your-entity-seed.ts`)
2. Implement your seed function following the pattern in existing files
3. Export your seed function as the default export
4. Import and add your seed function to the main `index.ts` file

## Best Practices

- Each seed script should handle one entity type
- Use try/catch blocks to handle errors properly
- Use `onConflictDoUpdate` to make seeds idempotent (safe to run multiple times)
- Log progress and completion status
