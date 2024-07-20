import React, { useState, useEffect } from "react";

import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  MenuItem,
  Select,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Snackbar from "@mui/material/Snackbar";
import dayjs from "dayjs";

function AddUser(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = React.useState(dayjs("2024-07-18"));
  const [role, setRole] = useState("Worker");
  const [salaryAmount, setSalaryAmount] = useState("");
  const [selectedManager, setSelectedManager] = useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    resetState();
  }, []);

  const handleAlert = (message) => {
    setMessage(message);
    setOpen(true);
  };

  const closeAlert = () => {
    setMessage(message);
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      !emailRegex.test(email) ||
      salaryAmount === "" ||
      (role !== "Manager" && selectedManager.trim() === "")
    ) {
      handleAlert("Please fill out all fields.");
      return;
    }
    props.addUser({
      firstName,
      lastName,
      email,
      startDate: startDate.format("DD/MM/YYYY"),
      role,
      salaryAmount,
      selectedManager,
    });
    props.closeModal();
    resetState();
  };

  function resetState() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setStartDate(dayjs("2024-07-18"));
    setRole("Worker");
    setFirstName("");
    setSalaryAmount("");
    setSelectedManager(undefined);
  }

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            marginBottom: 2,
          }}
        >
          Add New User
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={firstName.trim() === ""}
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={lastName.trim() === ""}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  email.trim() === "" ||
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                }
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Role"
                labelId="role-label"
                id="role"
                value={role}
                onChange={handleRoleChange}
              >
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Worker">Worker</MenuItem>
                <MenuItem value="Driver">Driver</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={salaryAmount.trim() === ""}
                required
                fullWidth
                id="salaryAmount"
                label="Salary Amount"
                name="salaryAmount"
                type="number"
                autoComplete="salary"
                value={salaryAmount}
                onChange={(e) => setSalaryAmount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                required
                error={
                  role !== "Manager" && typeof selectedManager === "undefined"
                }
              >
                <InputLabel id="selectedManager-label">Manager Name</InputLabel>
                <Select
                  labelId="selectedManager-label"
                  id="selectedManager"
                  value={selectedManager ?? ""}
                  label="Manager"
                  onChange={(e) => setSelectedManager(e.target.value)}
                  disabled={role === "Manager"}
                >
                  {props.users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.firstName} {user.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              endIcon={<AddIcon />}
              sx={{ mt: 3, mb: 2 }}
            >
              Add User
            </Button>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={closeAlert}
        message={message}
      />
    </Container>
  );
}

export default AddUser;
