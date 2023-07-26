import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import "./styles.css";

const UserTable = ({
  userData,
  searchQuery,
  onDeleteUser,
  onEditUserInfo,
  onRowClick,
}) => {
  const [editedData, setEditedData] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleEditUserInfo = (user) => {
    setEditedData((prev) => ({ ...prev, [user.id]: { ...user } }));
  };

  const handleSaveUserInfo = (userId) => {
    const updatedUser = editedData[userId];
    if (updatedUser) {
      onEditUserInfo(userId, updatedUser);
      setEditedData((prev) => ({ ...prev, [userId]: null }));
    }
  };

  const handleCancelEdit = (userId) => {
    setEditedData((prev) => ({ ...prev, [userId]: null }));
  };

  const handleInputChange = (e, userId) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [name]: value },
    }));
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) => [...prev, userId]);
  };

  const handleDeselectUser = (userId) => {
    setSelectedUsers((prev) => prev.filter((id) => id !== userId));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(userData.map((user) => user.id));
    }
    setSelectAll((prev) => !prev);
  };

  const handleDeleteMultipleUsers = () => {
    // Call the onDeleteUser callback for each selected user
    selectedUsers.forEach((userId) => onDeleteUser(userId));
    setSelectedUsers([]);
  };

  return (
    <div>
      <table>
        {/* Table header */}
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {userData.map((user) => (
            <tr
              key={user.id}
              onClick={() => onRowClick(user.id)} // Handle row click
              className={selectedUsers.includes(user.id) ? "selected-row" : ""}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => {
                    if (selectedUsers.includes(user.id)) {
                      handleDeselectUser(user.id);
                    } else {
                      handleSelectUser(user.id);
                    }
                  }}
                />
              </td>
              <td>{user.id}</td>
              <td>
                {editedData[user.id] ? (
                  <input
                    type="text"
                    name="name"
                    value={editedData[user.id].name}
                    onChange={(e) => handleInputChange(e, user.id)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editedData[user.id] ? (
                  <input
                    type="text"
                    name="email"
                    value={editedData[user.id].email}
                    onChange={(e) => handleInputChange(e, user.id)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editedData[user.id] ? (
                  <input
                    type="text"
                    name="role"
                    value={editedData[user.id].role}
                    onChange={(e) => handleInputChange(e, user.id)}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editedData[user.id] ? (
                  <div>
                    <button onClick={() => handleSaveUserInfo(user.id)}>
                      Save
                    </button>
                    <button onClick={() => handleCancelEdit(user.id)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button onClick={() => handleEditUserInfo(user)}>
                    <EditIcon />
                  </button>
                )}
              </td>
              <td>
                <button onClick={() => onDeleteUser(user.id)}>
                  <DeleteOutlineIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Delete Rows */}
      <div className="edit-delete-rows">
        <button onClick={handleDeleteMultipleUsers}>Delete Selected</button>
      </div>
    </div>
  );
};

export default UserTable;
