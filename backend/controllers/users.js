const { ObjectId } = require("mongodb");
const Users = require("../lib/users");
const users = new Users();

/**
 * Gets user by id
 */
exports.getUserById = async (ctx) => {
  const { id } = ctx.params;
  try {
    console.log(1);
    const user = await users.findUser({ _id: new ObjectId(id) });

    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || "Internal server error";
  }
};

exports.getManagerAndEmployees = async (ctx) => {
  const { id } = ctx.params;
  try {
    const user = await users.findUser({ _id: new ObjectId(id) });
    const employees = await users.findAllUsers({
      selectedManager: new ObjectId(id),
    });
    const res = { user, employees };
    ctx.status = 200;
    ctx.body = res;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || "Internal server error";
  }
};

exports.getAllUsers = async (ctx) => {
  try {
    const allUsers = await users.findAllUsers();

    ctx.status = 200;
    ctx.body = allUsers;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || "Internal server error";
  }
};

exports.addUser = async (ctx) => {
  var {
    firstName,
    lastName,
    email,
    startDate,
    role,
    salaryAmount,
    selectedManager,
  } = ctx.request.body;
  // validations should be here

  const user = await users.addUser(ctx.request.body);

  ctx.status = 201;
  ctx.body = user;
};

exports.editUser = async (ctx) => {
  try {
    const userId = ctx.params.id;
    const updates = ctx.request.body;
    const updatedUser = await users.editUser(userId, updates);

    if (!updatedUser) {
      ctx.status = 404;
      ctx.body = { message: "User not found" };
    } else {
      ctx.status = 200;
      ctx.body = updatedUser;
    }
  } catch (err) {
    console.error("Error updating user:", err);
    ctx.status = err.status || 500;
    ctx.body = { message: err.message || "Internal server error" };
  }
};

exports.deleteUser = async (ctx) => {
  try {
    await users.deleteUser(ctx.params.id); // Assuming you're using route params
    ctx.status = 204;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message || "Internal server error" };
  }
};

async function initialize() {
  await users.initialize();
}

initialize();
