const express = require("express");
const router = express.Router();
const controller = require("../controllers/conferencePublication.controller");

router.post("/", controller.createConferencePublication);
router.get("/", controller.getAllConferencePublications);
router.get("/:id", controller.getConferencePublicationById);
router.put("/:id", controller.updateConferencePublication);
router.put("/review/:id", controller.reviewConferencePublication);
router.delete("/:id", controller.deleteConferencePublication);

module.exports = router;
