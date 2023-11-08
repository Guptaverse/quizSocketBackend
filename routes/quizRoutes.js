const express = require("express");
const { createQuiz, getQuiz } = require("../controller/quiz");
const router = express.Router();

router.route("/create").post(createQuiz);
router.route("/get").post(getQuiz);

module.exports = router;