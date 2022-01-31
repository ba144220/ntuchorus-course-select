const { signin, signup, deleteAll, getAll, getById, modifyById } = require("../controllers/users");
const router = require("express-promise-router")();

router.post("/signin", signin);
router.post("/signup", signup);

router.get("/", getAll);
router.get("/:id", getById);
router.delete("/", deleteAll);
router.patch("/:id", modifyById);

module.exports = router;
