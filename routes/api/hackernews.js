const router = require("express").Router();
const hackernewsController = require("../../controllers/hackernewsController");

// Matches with "/api/hackernews"
router
  .route("/")
  .get(hackernewsController.findAll);

// Matches with "/api/hackernews/:id"
router
  .route("/:id")
  .get(hackernewsController.findById);

module.exports = router;
