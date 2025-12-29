/**
 * UserTable Component
 * The main component that displays and manages the user table
 *
 * This component handles:
 * - Fetching users from the API
 * - Displaying users in a table format
 * - Creating new users (via modal)
 * - Editing existing users (via modal)
 * - Deleting users (with confirmation)
 * - Loading states
 *
 * This is the heart of our CRUD application!
 */

'use client'; // Client Component - uses React hooks and browser APIs

import { useState, useEffect } from 'react';
import { User } from '@/backend/types/user';
import { Modal } from './Modal';
import { UserForm } from './UserForm';

/**
 * UserTable Component Function
 * Manages all state and operations for the user table
 */
export function UserTable() {
  // ==================== STATE MANAGEMENT ====================
  // useState is a React Hook that lets components "remember" things

  /**
   * users: Array of all users fetched from the API
   * setUsers: Function to update the users array
   */
  const [users, setUsers] = useState<User[]>([]);

  /**
   * isModalOpen: Boolean - controls if the modal is visible
   * setIsModalOpen: Function to show/hide the modal
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * editingUser: The user currently being edited (undefined = creating new user)
   * setEditingUser: Function to set which user is being edited
   */
  const [editingUser, setEditingUser] = useState<User | undefined>();

  /**
   * isLoading: Boolean - shows loading spinner while fetching data
   * setIsLoading: Function to update loading state
   */
  const [isLoading, setIsLoading] = useState(true);

  // ==================== SIDE EFFECTS ====================

  /**
   * useEffect Hook
   * Runs code after the component renders
   * The empty array [] means this only runs ONCE when component first loads
   */
  useEffect(() => {
    fetchUsers(); // Fetch users when component first loads
  }, []); // Empty dependency array = run once on mount

  // ==================== API FUNCTIONS ====================

  /**
   * FETCH USERS (READ Operation)
   * Gets all users from the API and updates the state
   */
  const fetchUsers = async () => {
    try {
      // Make GET request to /api/users
      const response = await fetch('/api/users');

      // Parse JSON response
      const data = await response.json();

      // Update state with fetched users
      setUsers(data);
    } catch (error) {
      // Log error if request fails
      console.error('Failed to fetch users:', error);
    } finally {
      // Always set loading to false when done (success or error)
      setIsLoading(false);
    }
  };

  /**
   * CREATE USER (CREATE Operation)
   * Sends new user data to the API
   * @param {Object} data - The user data (name, email, role)
   */
  const handleCreate = async (data: {
    name: string;
    email: string;
    role: string;
  }) => {
    try {
      // Make POST request to /api/users with user data
      const response = await fetch('/api/users', {
        method: 'POST', // POST = create new resource
        headers: { 'Content-Type': 'application/json' }, // Tell server we're sending JSON
        body: JSON.stringify(data), // Convert JavaScript object to JSON string
      });

      // If request successful (status 200-299)
      if (response.ok) {
        await fetchUsers(); // Refresh the user list
        setIsModalOpen(false); // Close the modal
      }
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  /**
   * UPDATE USER (UPDATE Operation)
   * Sends updated user data to the API
   * @param {Object} data - The updated user data
   */
  const handleUpdate = async (data: {
    name: string;
    email: string;
    role: string;
  }) => {
    // Safety check: make sure we have a user to update
    if (!editingUser) return;

    try {
      // Make PUT request to /api/users/:id with updated data
      const response = await fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT', // PUT = update existing resource
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // If request successful
      if (response.ok) {
        await fetchUsers(); // Refresh the user list
        setIsModalOpen(false); // Close the modal
        setEditingUser(undefined); // Clear the editing user
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  /**
   * DELETE USER (DELETE Operation)
   * Removes a user by calling the API
   * @param {string} id - The ID of the user to delete
   */
  const handleDelete = async (id: string) => {
    // Show confirmation dialog - if user clicks Cancel, stop here
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      // Make DELETE request to /api/users/:id
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE', // DELETE = remove resource
      });

      // If request successful
      if (response.ok) {
        await fetchUsers(); // Refresh the user list (deleted user will be gone)
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  // ==================== MODAL CONTROL FUNCTIONS ====================

  /**
   * Open modal for CREATING a new user
   * Sets editingUser to undefined (indicates CREATE mode)
   */
  const openCreateModal = () => {
    setEditingUser(undefined); // undefined = CREATE mode
    setIsModalOpen(true); // Open the modal
  };

  /**
   * Open modal for EDITING an existing user
   * @param {User} user - The user to edit
   */
  const openEditModal = (user: User) => {
    setEditingUser(user); // Set the user to edit
    setIsModalOpen(true); // Open the modal
  };

  /**
   * Close the modal and reset editing state
   */
  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    setEditingUser(undefined); // Clear editing user
  };

  // ==================== LOADING STATE ====================

  /**
   * If still loading, show a spinner
   * Early return - component stops here and doesn't render the table
   */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        {/* Spinning loader animation */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================

  return (
    <div className="w-full">
      {/* ========== HEADER SECTION ========== */}
      <div className="flex justify-between items-center mb-6">
        {/* Left side: Title and description */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your users with full CRUD operations
          </p>
        </div>

        {/* Right side: Add User button */}
        <button
          onClick={openCreateModal} // Open modal for creating new user
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-600/30 flex items-center gap-2"
        >
          {/* Plus icon SVG */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4" // Draws a + symbol
            />
          </svg>
          Add User
        </button>
      </div>

      {/* ========== TABLE SECTION ========== */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* overflow-x-auto = table can scroll horizontally on small screens */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* ========== TABLE HEADER ========== */}
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {/* Column headers */}
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            {/* ========== TABLE BODY ========== */}
            <tbody className="divide-y divide-gray-200">
              {/* Conditional rendering: Show message if no users, or map through users */}
              {users.length === 0 ? (
                // NO USERS: Show empty state message
                <tr>
                  {/* colSpan={5} means this cell spans all 5 columns */}
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No users found. Create one to get started!
                  </td>
                </tr>
              ) : (
                // HAS USERS: Map through array and create a row for each user
                // .map() is like a loop that creates a new array (of JSX elements)
                users.map((user) => (
                  <tr
                    key={user.id} // React needs unique key for list items
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* USER NAME COLUMN */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </td>

                    {/* USER EMAIL COLUMN */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-600">{user.email}</div>
                    </td>

                    {/* USER ROLE COLUMN */}
                    {/* Role shown as colored badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        // Dynamic className based on role - different colors for different roles
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'Admin'
                            ? 'bg-purple-100 text-purple-700' // Purple for Admin
                            : user.role === 'Manager'
                            ? 'bg-blue-100 text-blue-700' // Blue for Manager
                            : user.role === 'Developer'
                            ? 'bg-green-100 text-green-700' // Green for Developer
                            : 'bg-gray-100 text-gray-700' // Gray for others
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* CREATED AT COLUMN */}
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {/* Convert ISO date string to readable format */}
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTIONS COLUMN */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        {/* EDIT BUTTON */}
                        <button
                          onClick={() => openEditModal(user)} // Open edit modal with this user
                          className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                          title="Edit" // Tooltip on hover
                        >
                          {/* Edit icon (pencil) */}
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>

                        {/* DELETE BUTTON */}
                        <button
                          onClick={() => handleDelete(user.id)} // Delete this user
                          className="text-red-600 hover:text-red-800 transition-colors p-2 hover:bg-red-50 rounded-lg"
                          title="Delete" // Tooltip on hover
                        >
                          {/* Delete icon (trash can) */}
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========== MODAL FOR CREATE/EDIT ========== */}
      {/* Modal is always in the DOM, but only visible when isModalOpen is true */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        // Dynamic title: "Edit User" if editing, "Create New User" if creating
        title={editingUser ? 'Edit User' : 'Create New User'}
      >
        {/* UserForm inside the modal */}
        <UserForm
          user={editingUser} // Pass user if editing, undefined if creating
          // Dynamic onSubmit: use handleUpdate if editing, handleCreate if creating
          onSubmit={editingUser ? handleUpdate : handleCreate}
          onCancel={closeModal} // Close modal when Cancel is clicked
        />
      </Modal>
    </div>
  );
}
