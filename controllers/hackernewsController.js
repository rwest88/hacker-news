const axios = require("axios");
const db = require("../models");

module.exports = {
  // findAll searches the Hacker News Search API and returns only the entries we haven't already saved
  // It also makes sure that the articles returned from the API all contain a title, author, and link
  findAll: function(req, res) {
    const params = req.query;
    let info = {};
    axios
      .get("http://hn.algolia.com/api/v1/search", {
        params
      })
      .then(results => {
        info.nbPages = results.data.nbPages;
        info.nbHits = results.data.nbHits;
        return results.data.hits.filter(
          result =>
            result.title &&
            result.url &&
            result.author
        )
      })
      .then(apiArticles => 
        db.Article.find().then(dbArticles =>
          apiArticles.filter(apiArticle =>
            dbArticles.every(dbArticle => dbArticle.hackernewsId.toString() !== apiArticle.objectID)
          )
        )
      )
      .then(articles => res.json({ articles, info }))
      .catch(err => res.status(422).json(err));
  },
  // findById finds and serves a single article which contains a tree of comments
  findById: function(req, res) {
    axios
      .get("http://hn.algolia.com/api/v1/items/" + req.params.id)
      .then(result => res.json(result.data))
      .catch(err => res.status(422).json(err));
  }
};
