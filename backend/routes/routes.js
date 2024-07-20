const Router = require("koa-router");
const router = new Router();

const ctrl = require("../controllers/users");

router.get("/user", ctrl.getAllUsers);

router.get("/user/:id/employees", ctrl.getManagerAndEmployees);

router.get("/user/:id", ctrl.getUserById);

router.patch("/user/:id", ctrl.editUser);

router.post("/user", ctrl.addUser);

router.delete("/user/:id", ctrl.deleteUser);

router.allowedMethods();

module.exports = router;
