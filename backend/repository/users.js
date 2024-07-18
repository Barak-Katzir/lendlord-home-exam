const usersModel = require("../models/users");

class Users {
  async findOne(query, projection = {}) {
    const user = await usersModel.findOne(query).select(projection);
    return user;
  }

  async findAllUsers(projection = {}) {
    const users = await usersModel.find().select(projection);
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
}

module.exports = Users;
