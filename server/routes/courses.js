const router = require("express-promise-router")();
const {
    addCourses,
    getCourses,
    getCourse,
    deleteAllCourses,
    deleteCourse,
} = require("../controllers/courses");

router.post("/", addCourses);
router.get("/", getCourses);
router.get("/:id", getCourse);
router.delete("/", deleteAllCourses);
router.delete("/:id", deleteCourse);

module.exports = router;
