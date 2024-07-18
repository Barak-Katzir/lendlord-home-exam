const UsersRepo = require("../repository/users");

class Users {
  async initialize() {
    this.repo = new UsersRepo();
  }

  async findUser(query, projection = {}) {
    const user = await this.repo.findOne(query);

    return user;
  }

  async findAllUsers() {
    const user = await this.repo.findAllUsers();

    return user;
  }

  async addUser(newUser) {
    const user = await this.repo.addUser(newUser);
    return user;
  }
}

module.exports = Users;
