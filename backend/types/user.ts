/**
 * User Interface
 * This defines the structure of a User object in our application
 * All user data must follow this structure
 */
export interface User {
  id: string;           // Unique identifier for each user
  name: string;         // User's full name
  email: string;        // User's email address
  role: string;         // User's role (Admin, User, Manager, Developer)
  createdAt: string;    // Timestamp when user was created
}

/**
 * CreateUserDto (Data Transfer Object)
 * This defines what data is needed to CREATE a new user
 * "Dto" means it's used to transfer data between layers
 */
export interface CreateUserDto {
  name: string;         // Required: User's name
  email: string;        // Required: User's email
  role: string;         // Required: User's role
  // Note: id and createdAt are NOT included because they're auto-generated
}

/**
 * UpdateUserDto (Data Transfer Object)
 * This defines what data can be used to UPDATE an existing user
 * All fields are optional (?) because you might only want to update one field
 */
export interface UpdateUserDto {
  name?: string;        // Optional: Update user's name
  email?: string;       // Optional: Update user's email
  role?: string;        // Optional: Update user's role
}
