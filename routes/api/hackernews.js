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

// // Matches with "/api/hackernews/by_date"
// router
//   .route("/by_date")
//   .get(hackernewsController.findAll)

module.exports = router;
