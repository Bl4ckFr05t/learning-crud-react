# Backend Directory

This directory contains all server-side code and logic.

## Suggested Structure

```
backend/
├── api/            # API route handlers (can reference from app/api)
├── models/         # Database models/schemas
├── services/       # Business logic services
├── utils/          # Server-side utility functions
├── middleware/     # Custom middleware
├── config/         # Configuration files (database, environment)
├── types/          # TypeScript types/interfaces (server-side)
└── lib/            # External library integrations
```

## What Goes Here

- Database connection logic
- Data models and schemas (Prisma, Mongoose, etc.)
- Server actions and API handlers
- Authentication/authorization logic
- Business logic and data processing
- Server-side utilities
- Third-party integrations (payment, email, etc.)
