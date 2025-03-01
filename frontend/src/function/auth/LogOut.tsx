import React from 'react';
import { LogOut as LogOutIcon } from 'lucide-react';
import { DropdownMenuItem } from "@/components/shadcn/ui/dropdown-menu"
import { logoutApi } from '@/api/features/authApi'; // adjust import path as needed

// Define the type for the props
type LogOutProps = {
  onLogout?: () => Promise<void>;
};

export const LogOut: React.FC<LogOutProps> = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      // If a custom logout handler is provided, use it
      if (onLogout) {
        await onLogout();
      } else {
        await logoutApi.logout();
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred during logout.');
    }
  };

  return (
    <DropdownMenuItem 
        className="cursor-pointer"
        onSelect={handleLogout}>
      <LogOutIcon className="mr-2 h-4 w-4" />
      Log out
    </DropdownMenuItem>
  );
};

export default LogOut;