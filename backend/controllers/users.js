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
  console.log(JSON.stringify(ctx.request.body));
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

async function initialize() {
  await users.initialize();
}

initialize();
