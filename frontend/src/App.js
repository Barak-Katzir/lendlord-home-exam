import React, { useState, useEffect } from "react";

import GenericModal from "./components/modal";
import Header from "./components/header";
import EmployeesTable from "./components/EmployeesTable";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import { getAllUsers, addUser, editUser, deleteUser } from "./resources/users";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";

function App() {
  const [shown, setShown] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  const closeModal = () => {
    setShown(false);
    setSelectedUser(undefined);
  };

  const openModal = () => setShown(true);

  function createUser(user) {
    addUser(user).then((res) =>
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers];
        newUsers.push(res.data);
        return newUsers;
      })
    );
  }

  function changeUser(user) {
    editUser(user._id, user)
      .then((updatedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (updatedUser._id === u._id ? updatedUser : u))
        );
        setSelectedUser(undefined);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
    return user;
  }

  function removeUser(id) {
    deleteUser(id).then(() =>
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id))
    );
  }

  function openEdit(user) {
    setSelectedUser(user);
    openModal();
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <Header />
      <div id="content">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <Button variant="contained" endIcon={<AddIcon />} onClick={openModal}>
            Add
          </Button>
          <TextField
            variant="outlined"
            placeholder="Search…"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <EmployeesTable
          users={filteredUsers}
          deleteUser={removeUser}
          editUser={openEdit}
        />
        <GenericModal displayModal={shown} closeModal={closeModal}>
          {selectedUser ? (
            <EditUser
              user={selectedUser}
              editUser={changeUser}
              closeModal={closeModal}
              users={users}
            />
          ) : (
            <AddUser
              addUser={createUser}
              closeModal={closeModal}
              users={users}
            />
          )}
        </GenericModal>
      </div>
    </div>
  );
}

export default App;
