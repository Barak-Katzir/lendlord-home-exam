import React, { useState } from "react";

import "./App.css";
import GenericModal from "./components/modal";
import Header from "./components/header";
import EmployeesTable from "./components/EmployeesTable";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddUser from "./components/AddUser";

function createData(
  id,
  firstName,
  lastName,
  email,
  startDate,
  role,
  salaryAmount,
  selectedManager
) {
  return {
    id,
    firstName,
    lastName,
    email,
    startDate,
    role,
    salaryAmount,
    selectedManager,
  };
}

const rows = [
  createData(1, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(2, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(3, "Eclair", 262, 16.0, 24, 6.0),
  createData(4, "Cupcake", 305, 3.7, 67, 4.3),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
];

function App() {
  const [shown, setShown] = useState(false);
  const [users, setUsers] = useState(rows);

  const toggleModal = () => setShown((prev) => !prev);

  function addUser(user) {
    setUsers((prevUsers) => {
      prevUsers.push(user);
      return prevUsers;
    });
  }

  function deleteUser(id) {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  }

  return (
    <div className="App">
      <Header />
      <div id="content">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={toggleModal}
        >
          Add
        </Button>
        <EmployeesTable users={users} deleteUser={deleteUser} />
        <GenericModal displayModal={shown} closeModal={toggleModal}>
          <AddUser addUser={addUser} closeModal={toggleModal} />
        </GenericModal>
      </div>
    </div>
  );
}

export default App;
