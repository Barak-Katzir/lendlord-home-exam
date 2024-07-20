const UsersRepo = require("../repository/users");

class Users {
  async initialize() {
    this.repo = new UsersRepo();
  }

  async findUser(query, projection = {}) {
    const user = await this.repo.findOne(query);

    return user;
  }

  async findAllUsers(query) {
    const user = await this.repo.findAllUsers(query);

    return user;
  }

  async addUser(newUser) {
    const user = await this.repo.addUser(newUser);
    return user;
  }

  async editUser(userId, updates) {
    const updatedUser = await this.repo.updateUser(userId, updates);
    return updatedUser;
  }

  async deleteUser(userId) {
    await this.repo.deleteUser(userId);
    return userId;
  }
}

module.exports = Users;
