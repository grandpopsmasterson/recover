// components/AssignUserBtn.tsx
import { apiClient } from "@/api/clients";
import { projectsApi } from "@/api/features/projectsApi";
import { Select, SelectItem, Avatar, Chip, Button } from "@heroui/react";
import React, { useState } from "react";

// Define the simplified User interface
export interface User {
  id: number;
  shortName: string;
  picture: string;
  role: string;
}

interface AssignUserBtnProps {
  projectId: string; // Pass projectId from parent component
}

const AssignUserBtn: React.FC<AssignUserBtnProps> = ({ projectId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data: User[] = await projectsApi.getAllUsers();
      setUsers(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectionChange = (keys: "all" | Set<React.Key> & { anchorKey?: string; currentKey?: string }) => {
    let selectedIds: number[] = [];

    if (keys === "all") {
      selectedIds = users.map((user) => user.id); // Handle "select all" case
    } else {
      selectedIds = Array.from(keys) as number[]; // Handle individual or multiple selections
    }

    // Now, send the selectedIds in the POST request when needed
    handleSubmit(selectedIds);
  };

  const handleSubmit = async (selectedIds: number[]) => {
    if (!projectId) {
      console.error("No projectId found in the URL");
      return;
    }

    try {
      const response = await apiClient.post(`/api/project/${projectId}/assign-users`, {
        selectedItems: selectedIds, // Send the selected IDs directly
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting selected items:", error);
    }
  };

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {loading && <div>Loading...</div>}
      <Select
        classNames={{
          trigger: "min-h-12 py-2",
        }}
        fullWidth
        isOpen={isOpen}
        onOpenChange={(open: boolean) => {
          setIsOpen(open);
          if (open) {
            fetchUsers();
          }
        }}
        onSelectionChange={handleSelectionChange} // Directly pass the selected keys
        isMultiline={true}
        labelPlacement="outside"
        placeholder="Assign a user"
        items={users}
        renderValue={(items) => {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip key={item.key}>{(item.data as User).shortName}</Chip>
                ))}
              </div>
            );
          }}
        selectionMode="multiple"
        variant="bordered"
      >
        {(user) => (
          <SelectItem key={user.id} textValue={user.shortName}>
            <div className="flex gap-2 items-center">
              <Avatar alt={user.shortName} className="flex-shrink-0" size="sm" src={user.picture} />
              <div className="flex flex-col">
                <span className="text-small">{user.shortName}</span>
                <span className="text-tiny text-default-400">{user.role}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
      {/* <Button onPress={() => handleSubmit([])}>Assign Users</Button>  */}
    </>
  );
};

export default AssignUserBtn;
