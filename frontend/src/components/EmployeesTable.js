import * as React from "react";
import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TableSortLabel from "@mui/material/TableSortLabel";

const EmployeesTable = (props) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortArray = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const sortedUsers = sortArray(props.users, getComparator(order, orderBy));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sortDirection={orderBy === "firstName" ? order : false}>
              <TableSortLabel
                active={orderBy === "firstName"}
                direction={orderBy === "firstName" ? order : "asc"}
                onClick={() => handleRequestSort("firstName")}
              >
                <strong>First Name</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === "lastName" ? order : false}>
              <TableSortLabel
                active={orderBy === "lastName"}
                direction={orderBy === "lastName" ? order : "asc"}
                onClick={() => handleRequestSort("lastName")}
              >
                <strong>Last Name</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === "email" ? order : false}>
              <TableSortLabel
                active={orderBy === "email"}
                direction={orderBy === "email" ? order : "asc"}
                onClick={() => handleRequestSort("email")}
              >
                <strong>Email</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === "startDate" ? order : false}>
              <TableSortLabel
                active={orderBy === "startDate"}
                direction={orderBy === "startDate" ? order : "asc"}
                onClick={() => handleRequestSort("startDate")}
              >
                <strong>Date Started</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === "role" ? order : false}>
              <TableSortLabel
                active={orderBy === "role"}
                direction={orderBy === "role" ? order : "asc"}
                onClick={() => handleRequestSort("role")}
              >
                <strong>Role</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "salaryAmount" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "salaryAmount"}
                direction={orderBy === "salaryAmount" ? order : "asc"}
                onClick={() => handleRequestSort("salaryAmount")}
              >
                <strong>Salary</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "selectedManager" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "selectedManager"}
                direction={orderBy === "selectedManager" ? order : "asc"}
                onClick={() => handleRequestSort("selectedManager")}
              >
                <strong>Manager</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((row) => {
            const manager = props.users.find(
              (u) => u._id === row.selectedManager
            );
            return (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <strong>{row.firstName}</strong>
                </TableCell>
                <TableCell>
                  <strong>{row.lastName}</strong>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <strong>{row.startDate}</strong>
                </TableCell>
                <TableCell>
                  <strong>{row.role}</strong>
                </TableCell>
                <TableCell>
                  <strong>{row.salaryAmount}</strong>
                </TableCell>
                <TableCell>
                  {manager ? `${manager.firstName} ${manager.lastName}` : ""}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={(e) => props.editUser(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={(e) => props.deleteUser(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeesTable;
