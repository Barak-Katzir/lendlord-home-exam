const usersModel = require("../models/users");

class Users {
  async findOne(query, projection = {}) {
    const user = await usersModel.findOne(query).select(projection);
    return user;
  }

  async findAllUsers(query, projection = {}) {
    const users = await usersModel.find(query).select(projection);
    return users;
  }

  async addUser(user) {
    const newUser = new usersModel(user);
    try {
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log("Failed to save to DB");
    }
  }

  async updateUser(userId, updates) {
    try {
      const result = await usersModel.findByIdAndUpdate(userId, updates, {
        new: true,
      });
      return result;
    } catch (err) {
      console.error("Failed to update user:", err);
      throw err;
    }
  }

  async deleteUser(userId) {
    try {
      await usersModel.deleteOne({ _id: userId });
      return userId;
    } catch (err) {
      console.log("Failed to delete.");
    }
  }
}

module.exports = Users;
