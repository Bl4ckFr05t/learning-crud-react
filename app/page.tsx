/**
 * Home Page (Main Page)
 * This is the main landing page of our application
 *
 * In Next.js App Router:
 * - Files named page.tsx define routes
 * - This file is at /app/page.tsx, so it's the home page (/)
 * - The component exported as default is what gets rendered
 */

import { UserTable } from '@/frontend/components/UserTable';

/**
 * Home Component
 * The root page component that renders the user management interface
 *
 * Structure:
 * - Outer div: Full-screen container with gradient background
 * - Main section: Centers content with max width and padding
 * - UserTable: The actual table component with all CRUD functionality
 */
export default function Home() {
  return (
    // Full-screen container with beautiful gradient background
    // min-h-screen = minimum height of 100vh (full viewport height)
    // bg-gradient-to-br = gradient from top-left to bottom-right
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Main content container */}
      {/* container mx-auto = centered container with auto margins */}
      {/* px-4 py-8 = padding (x=horizontal, y=vertical) */}
      {/* max-w-7xl = maximum width (1280px) */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Render the UserTable component */}
        {/* This component contains all the CRUD functionality */}
        <UserTable />
      </main>
    </div>
  );
}
