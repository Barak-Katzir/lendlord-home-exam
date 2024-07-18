const Router = require("koa-router");
const router = new Router();

const ctrl = require("../controllers/users");

router.get("/user", ctrl.getAllUsers);

router.get("/user/:id", ctrl.getUserById);

router.post("/user", ctrl.addUser);

router.allowedMethods();

module.exports = router;
