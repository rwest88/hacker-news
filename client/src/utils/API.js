import axios from "axios";

export default {
  // Gets Articles from the Hacker News API
  getArticles: function(query, hitsPerPage, page, tags) {
    return axios.get("/api/hackernews", { params: { query, hitsPerPage, page, tags } });
  },
  // Gets Articles from the Hacker News API
  getArticle: function(id) {
    return axios.get("/api/hackernews/" + id)
  },
  // Gets all saved Articles
  getSavedArticles: function() {
    return axios.get("/api/articles");
  },
  // Deletes the saved Article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an Article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
