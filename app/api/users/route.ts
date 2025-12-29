/**
 * API Route: /api/users
 * This file handles HTTP requests to the /api/users endpoint
 *
 * In Next.js App Router:
 * - File location determines the URL path
 * - Export named functions (GET, POST, PUT, DELETE) to handle different HTTP methods
 * - This file handles GET (fetch all) and POST (create new)
 */

import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/backend/services/userService';
import { CreateUserDto } from '@/backend/types/user';

/**
 * GET /api/users
 * Fetches all users from the database
 *
 * @returns {Promise<NextResponse>} JSON response with array of users
 *
 * Example usage:
 * fetch('/api/users')
 */
export async function GET() {
  try {
    // Call the service to get all users
    const users = userService.getAll();

    // Return users as JSON response (status 200 by default)
    return NextResponse.json(users);
  } catch (error) {
    // If something goes wrong, return error with status 500 (Internal Server Error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users
 * Creates a new user in the database
 *
 * @param {NextRequest} request - The incoming HTTP request with user data in body
 * @returns {Promise<NextResponse>} JSON response with the created user
 *
 * Example usage:
 * fetch('/api/users', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ name: 'John', email: 'john@test.com', role: 'User' })
 * })
 */
export async function POST(request: NextRequest) {
  try {
    // Extract JSON data from the request body
    const body: CreateUserDto = await request.json();

    // Validate required fields
    // Return 400 (Bad Request) if any required field is missing
    if (!body.name || !body.email || !body.role) {
      return NextResponse.json(
        { error: 'Name, email, and role are required' },
        { status: 400 } // 400 = Bad Request
      );
    }

    // Call the service to create the user
    const newUser = userService.create(body);

    // Return the created user with status 201 (Created)
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    // If something goes wrong, return error with status 500
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
