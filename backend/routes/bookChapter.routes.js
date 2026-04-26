const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookChapter.controller");

router.post("/", controller.createBookChapter);
router.get("/", controller.getAllBookChapters);
router.get("/:id", controller.getBookChapterById);
router.put("/:id", controller.updateBookChapter);
router.delete("/:id", controller.deleteBookChapter);

module.exports = router;
