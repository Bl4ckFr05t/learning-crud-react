/**
 * API Route: /api/users/[id]
 * This file handles HTTP requests to /api/users/:id endpoint
 *
 * Dynamic Route:
 * - [id] in folder name means this is a dynamic route parameter
 * - If user visits /api/users/123, the id will be "123"
 * - This file handles PUT (update) and DELETE operations on a specific user
 */

import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/backend/services/userService';
import { UpdateUserDto } from '@/backend/types/user';

/**
 * PUT /api/users/:id
 * Updates an existing user by their ID
 *
 * @param {NextRequest} request - The incoming HTTP request with updated data
 * @param {Object} params - Route parameters containing the user ID
 * @returns {Promise<NextResponse>} JSON response with updated user or error
 *
 * Example usage:
 * fetch('/api/users/123', {
 *   method: 'PUT',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ name: 'Updated Name' })
 * })
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extract the id from the route parameters
    // In Next.js 15+, params is a Promise and must be awaited
    const { id } = await params;

    // Extract the update data from request body
    const body: UpdateUserDto = await request.json();

    // Call the service to update the user
    const updatedUser = userService.update(id, body);

    // If user not found, return 404 (Not Found) error
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 } // 404 = Not Found
      );
    }

    // Return the updated user with status 200 (OK)
    return NextResponse.json(updatedUser);
  } catch (error) {
    // If something goes wrong, return error with status 500
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users/:id
 * Deletes a user by their ID
 *
 * @param {NextRequest} request - The incoming HTTP request
 * @param {Object} params - Route parameters containing the user ID
 * @returns {Promise<NextResponse>} JSON response with success message or error
 *
 * Example usage:
 * fetch('/api/users/123', {
 *   method: 'DELETE'
 * })
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extract the id from the route parameters
    const { id } = await params;

    // Call the service to delete the user
    // Returns true if successful, false if user not found
    const success = userService.delete(id);

    // If user not found, return 404 error
    if (!success) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return success message with status 200
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    // If something goes wrong, return error with status 500
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
