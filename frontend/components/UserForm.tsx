/**
 * UserForm Component
 * A form component for creating or editing users
 *
 * Features:
 * - Can be used for both CREATE and EDIT operations
 * - Shows pre-filled data when editing an existing user
 * - Validates required fields (name and email)
 * - Has a dropdown for selecting user role
 */

'use client'; // Client Component - uses React hooks (useState)

import { FormEvent, useState } from 'react';
import { User } from '@/backend/types/user';

/**
 * Props interface for UserForm component
 */
interface UserFormProps {
  user?: User;  // Optional: If provided, form is in EDIT mode. If not, CREATE mode
  onSubmit: (data: { name: string; email: string; role: string }) => void; // Function to call when form is submitted
  onCancel: () => void;  // Function to call when user clicks Cancel button
}

/**
 * UserForm Component Function
 * @param {UserFormProps} props - The component props
 */
export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  /**
   * Form State Management using useState hook
   * Stores the current values of all form fields
   *
   * If user prop exists (EDIT mode): pre-fill with existing data
   * If no user prop (CREATE mode): use empty strings and default "User" role
   */
  const [formData, setFormData] = useState({
    name: user?.name || '',      // Use existing name or empty string
    email: user?.email || '',    // Use existing email or empty string
    role: user?.role || 'User',  // Use existing role or default to 'User'
  });

  /**
   * Form Submit Handler
   * Prevents default form submission (which would reload the page)
   * Then calls the onSubmit function passed from parent component
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Stop the browser from refreshing the page
    onSubmit(formData); // Send form data to parent component
  };

  return (
    // Form element with submit handler
    // space-y-4 = adds vertical spacing between form elements
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* NAME INPUT FIELD */}
      <div>
        {/* Label for name input */}
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        {/* Text input for name */}
        <input
          type="text"
          id="name"
          required // Browser will prevent submission if empty
          value={formData.name} // Controlled input: value comes from state
          // onChange: Updates state when user types
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Enter name"
        />
      </div>

      {/* EMAIL INPUT FIELD */}
      <div>
        {/* Label for email input */}
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        {/* Email input with built-in validation */}
        <input
          type="email" // Browser validates email format
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Enter email"
        />
      </div>

      {/* ROLE SELECT DROPDOWN */}
      <div>
        {/* Label for role dropdown */}
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Role
        </label>
        {/* Dropdown select for role */}
        <select
          id="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        >
          {/* Available role options */}
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
        </select>
      </div>

      {/* FORM ACTION BUTTONS */}
      {/* flex gap-3 = buttons side by side with gap between them */}
      <div className="flex gap-3 pt-4">
        {/* SUBMIT BUTTON */}
        {/* type="submit" triggers the form's onSubmit handler */}
        {/* flex-1 = takes up equal space */}
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {/* Show "Update" if editing existing user, "Create" if creating new */}
          {user ? 'Update' : 'Create'}
        </button>

        {/* CANCEL BUTTON */}
        {/* type="button" prevents form submission */}
        <button
          type="button"
          onClick={onCancel} // Call the onCancel function when clicked
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
