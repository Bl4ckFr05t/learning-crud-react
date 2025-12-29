/**
 * User Service
 * This file handles all the business logic for managing users
 * In a real app, this would connect to a database
 * For now, we use an in-memory array (data resets when server restarts)
 */

import { User, CreateUserDto, UpdateUserDto } from '../types/user';

/**
 * In-memory storage for users
 * This array holds all our user data
 * In production, replace this with a real database (PostgreSQL, MongoDB, etc.)
 */
let users: User[] = [
  // Sample user 1 - Admin
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    createdAt: new Date().toISOString(), // Current date/time in ISO format
  },
  // Sample user 2 - Regular User
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    createdAt: new Date().toISOString(),
  },
  // Sample user 3 - Regular User
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    createdAt: new Date().toISOString(),
  },
];

/**
 * User Service Object
 * Contains all CRUD operations for users
 * Each method handles a specific operation
 */
export const userService = {
  /**
   * GET ALL USERS
   * Returns the entire list of users
   * @returns {User[]} Array of all users
   */
  getAll(): User[] {
    return users;
  },

  /**
   * GET USER BY ID
   * Finds and returns a single user by their ID
   * @param {string} id - The user's unique identifier
   * @returns {User | undefined} The user if found, undefined if not
   */
  getById(id: string): User | undefined {
    // .find() searches the array and returns the first matching item
    return users.find((user) => user.id === id);
  },

  /**
   * CREATE NEW USER
   * Creates a new user and adds them to the users array
   * @param {CreateUserDto} data - The data for the new user (name, email, role)
   * @returns {User} The newly created user with id and createdAt added
   */
  create(data: CreateUserDto): User {
    // Create new user object
    const newUser: User = {
      id: Date.now().toString(), // Generate unique ID from current timestamp
      ...data,                   // Spread operator: copies name, email, role from data
      createdAt: new Date().toISOString(), // Add creation timestamp
    };

    // Add new user to the array
    users.push(newUser);

    // Return the created user
    return newUser;
  },

  /**
   * UPDATE USER
   * Updates an existing user's information
   * @param {string} id - The ID of the user to update
   * @param {UpdateUserDto} data - The fields to update (can be partial)
   * @returns {User | null} Updated user if found, null if not found
   */
  update(id: string, data: UpdateUserDto): User | null {
    // Find the index of the user in the array
    const index = users.findIndex((user) => user.id === id);

    // If user not found (index is -1), return null
    if (index === -1) return null;

    // Update the user by merging old data with new data
    users[index] = {
      ...users[index], // Keep all existing fields
      ...data,         // Override with new data (only provided fields)
    };

    // Return the updated user
    return users[index];
  },

  /**
   * DELETE USER
   * Removes a user from the users array
   * @param {string} id - The ID of the user to delete
   * @returns {boolean} true if deleted successfully, false if user not found
   */
  delete(id: string): boolean {
    // Find the index of the user
    const index = users.findIndex((user) => user.id === id);

    // If user not found, return false
    if (index === -1) return false;

    // Remove the user from the array
    // .splice(index, 1) removes 1 item at the specified index
    users.splice(index, 1);

    // Return true to indicate successful deletion
    return true;
  },
};
