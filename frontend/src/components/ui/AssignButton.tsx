import { Select, SelectItem, Avatar, Chip, Button } from "@heroui/react";
import React, { useState } from "react";

// Define the simplified User interface
interface User {
  id: number;
  shortName: string;
  picture: string;
  role: string;
}

export default function AssignUserBtn() {
  const [users, setUsers] = useState<User[]>([]); // State to hold fetched users, typed with the User interface
  const [loading, setLoading] = useState<boolean>(false); // Loading state for async requests
  const [error, setError] = useState<string>(""); // Error handling

  // Fetch users from the backend when the component is mounted or when the dropdown is triggered
  const fetchUsers = async () => {
    setLoading(true); // Set loading state
    try {
      // Make a fetch request to the backend API
      const response = await fetch("https://your-backend-api.com/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json(); // Assume your backend returns a list of users
      setUsers(data); // Set the users to state
    } catch (error: any) {
      setError(error.message); // Set error if fetch fails
    } finally {
      setLoading(false); // Reset loading state after request is finished
    }
  };

  // This is called whenever the dropdown is clicked (we use an onOpen handler)
  const handleDropdownOpen = () => {
    if (users.length === 0) {
      fetchUsers(); // Only fetch users if we don't have any in state
    }
  };

  return (
    <>
        <Select
        classNames={{
            base: "max-w-xs",
            trigger: "min-h-12 py-2",
        }}
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        selectedKeys={selectedUsers}
        onSelectionChange={handleSelectionChange}
        isMultiline={true}
        label="Assigned to"
        labelPlacement="outside"
        placeholder="Select a user"
        items={users}
        renderValue={(items) => {
            return (
            <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                <Chip key={item.id}>{item.shortName}</Chip>
                ))}
            </div>
            );
        }}
        selectionMode="multiple"
        variant="bordered"
        data-pressed={handleDropdownOpen} // Trigger fetching users when the dropdown is opened
        >
        {(user) => 
            <SelectItem key={user.id} textValue={user.shortName}>
            <div className="flex gap-2 items-center">
                <Avatar alt={user.shortName} className="flex-shrink-0" size="sm" src={user.picture} /> {/* Use the picture */}
                <div className="flex flex-col">
                <span className="text-small">{user.shortName}</span> {/* Display shortname */}
                <span className="text-tiny text-default-400">{user.role}</span> {/* Display role */}
                </div>
            </div>
            </SelectItem>
        }
        </Select>
        <Button onPress={handleSubmit}>Submit Selected Users</Button>
    </>
  );
}

import React, { useState } from "react";
import { Select, SelectItem, Button } from "@heroui/react";

const UserAssignmentSelect = () => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(new Set());

  const fetchUsers = async () => {
    // Replace this with your actual API call
    const response = await fetch('your-api-endpoint');
    const data = await response.json();
    setUsers(data);
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (open) {
      fetchUsers();
    }
  };

  const handleSelectionChange = (keys) => {
    setSelectedUsers(keys);
  };

  const handleSubmit = () => {
    console.log("Selected users:", Array.from(selectedUsers));
    // Add your submission logic here
  };

  return (
    <>
      <Select
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        selectedKeys={selectedUsers}
        onSelectionChange={handleSelectionChange}
        label="Assign Users"
        selectionMode="multiple"
      >
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </Select>
      <Button onPress={handleSubmit}>Submit Selected Users</Button>
    </>
  );
};