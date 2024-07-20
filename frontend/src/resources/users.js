import axios from "axios";

export function getAllUsers() {
  return axios.get("http://localhost:3002/user");
}

export function addUser(user) {
  return axios.post("http://localhost:3002/user", user);
}

export function editUser(userId, updates) {
  return axios
    .patch(`http://localhost:3002/user/${userId}`, updates, {
      withCredentials: true,
    })
    .then((response) => response.data);
}

export function deleteUser(userId) {
  return axios.delete(`http://localhost:3002/user/${userId}`, {
    withCredentials: true,
  });
}
