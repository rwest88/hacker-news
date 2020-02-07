const router = require("express").Router();
const articleRoutes = require("./articles");
const hackernewsRoutes = require("./hackernews");

// Article routes
router.use("/articles", articleRoutes);

// Hacker News routes
router.use("/hackernews", hackernewsRoutes);

module.exports = router;
