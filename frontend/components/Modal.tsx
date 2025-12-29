/**
 * Modal Component
 * A reusable modal/dialog component that displays content in an overlay
 *
 * Features:
 * - Overlay background that can be clicked to close
 * - Close button (X) in top-right corner
 * - Centered on screen with blur backdrop
 * - Can display any content passed as children
 */

'use client'; // This tells Next.js this is a Client Component (can use hooks, events, etc.)

import { ReactNode } from 'react';

/**
 * Props interface for Modal component
 * Defines what data the Modal needs to work
 */
interface ModalProps {
  isOpen: boolean;        // Controls whether modal is visible or hidden
  onClose: () => void;    // Function to call when user wants to close the modal
  title: string;          // Text to display in the modal header
  children: ReactNode;    // Content to display inside the modal (can be any React element)
}

/**
 * Modal Component Function
 * @param {ModalProps} props - The component props
 */
export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // If modal is not open, don't render anything (return null)
  if (!isOpen) return null;

  return (
    // Outer container: Fixed position, covers entire screen, z-50 = high z-index (appears on top)
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop/Overlay: Dark background with blur effect */}
      {/* Clicking this will close the modal */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose} // Close modal when backdrop is clicked
      />

      {/* Modal Content Container */}
      {/* relative = positioned relative to backdrop, not fixed to screen */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          {/* Modal Title */}
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

          {/* Close Button (X icon) */}
          <button
            onClick={onClose} // Close modal when X is clicked
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {/* SVG icon for X/close symbol */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" // This draws an X shape
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        {/* This is where the children content will be rendered */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
