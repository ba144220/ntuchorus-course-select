const { signin, signup, deleteAll, getAll } = require("../controllers/users");
const router = require("express-promise-router")();

router.post("/signin", signin);
router.post("/signup", signup);

router.get("/", getAll);
router.delete("/", deleteAll);

module.exports = router;
