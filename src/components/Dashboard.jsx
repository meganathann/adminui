import React, { useState, useEffect } from "react";
import UserTable from "./UserTable";
import SearchBox from "./Searchbox";
import Header from "./Header";
import Footer from "./Footer";
import "./styles.css";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editedData, setEditedData] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);

  const usersPerPage = 10;

  useEffect(() => {
    // Fetch data from API and set it to userData state
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset current page to 1 when search query changes
  };

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle row click (for row selection)
  const handleRowClick = (userId) => {
    if (selectedUsers.includes(userId)) {
      handleDeselectUser(userId);
    } else {
      handleSelectUser(userId);
    }
  };

  // Calculate the data to be displayed on the current page
  const firstIndex = (currentPage - 1) * usersPerPage;
  const lastIndex = firstIndex + usersPerPage;
  const filteredData = userData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const dataPerPage = filteredData.slice(firstIndex, lastIndex);

  // Function to delete a user by ID
  const handleDeleteUser = (userId) => {
    setUserData((prevData) => prevData.filter((user) => user.id !== userId));
    setSelectedUsers((prev) => prev.filter((id) => id !== userId));
  };

  // Function to edit user info
  const handleEditUserInfo = (userId, updatedUser) => {
    setUserData((prevData) =>
      prevData.map((user) =>
        user.id === userId ? { ...user, ...updatedUser } : user
      )
    );
  };

  // Function to handle user selection
  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) => [...prev, userId]);
  };

  // Function to handle user deselection
  const handleDeselectUser = (userId) => {
    setSelectedUsers((prev) => prev.filter((id) => id !== userId));
  };

  // eslint-disable-next-line no-unused-vars
  const handleDeleteMultipleUsers = () => {
    selectedUsers.forEach((userId) => handleDeleteUser(userId));
    setSelectedUsers([]);
  };

  return (
    <div>
      <Header />
      <SearchBox
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <UserTable
        userData={dataPerPage}
        searchQuery={searchQuery}
        onDeleteUser={handleDeleteUser}
        onEditUserInfo={handleEditUserInfo}
        onRowClick={handleRowClick}
        editedData={editedData}
        setEditedData={setEditedData}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
      {/* Pagination */}
      <Footer
        currentPage={currentPage}
        totalPage={Math.ceil(filteredData.length / usersPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Dashboard;
