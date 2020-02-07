import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Article from "../components/Article";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import './pages.css';

import { addSearchTerm } from "../actions";
import { connect } from "react-redux";

class Home extends Component {
  state = {
    articles: [],
    info: {},
    searchTerm: "",
    page: 0,
    hitsPerPage: 20,
    message: "Search For An Article To Begin!"
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getArticles = (savedTerm) => {
    let { dispatch } = this.props;
    let { message, searchTerm } = this.state;
    const { hitsPerPage, page, tags } = this.state;

    if (savedTerm) {
      searchTerm = savedTerm;
    } else {
      dispatch(addSearchTerm(searchTerm));
    }

    API.getArticles(searchTerm, hitsPerPage, page, tags)
      .then(res => {
        if (!res.data.articles.length) {
          message = "No New Articles Found, Try a Different Search Term"
        }
        this.setState({
          articles: res.data.articles,
          info: res.data.info,
          message,
        })
      })
      .catch(() =>
        this.setState({
          articles: [],
          message: "No New Articles Found, Try a Different Search Term"
        })
      );
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({ page: 0, tags: null }, () => this.getArticles());
  };

  handleFrontPageSubmit = event => {
    event.preventDefault();
    this.setState({ page: 0, tags: 'front_page' }, () => this.getArticles());
  }

  handleArticleSave = id => {
    const article = this.state.articles.find(article => article.objectID === id);

    API.saveArticle({
      hackernewsId: article.objectID,
      created: article.created_at,
      title: article.title,
      url: article.url,
      author: article.author,
    }).then(() => this.getArticles());
  };

  stepPage = num => {
    let { page } = this.state;
    page += num;
    this.setState({ page }, () => this.getArticles());
  };

  toPage = page => this.setState({ page }, () => this.getArticles());

  render() {
    const { searchTerms } = this.props;
    const { page, hitsPerPage, info } = this.state;
    const { nbPages, nbHits } = info;
    let temp = [ ...searchTerms ];
    let displayedSearchTerms = temp.reverse();
    console.log(displayedSearchTerms);
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>Hacker News Search</strong>
              </h1>
              <h2 className="text-center">Search for and Save Articles of Interest.</h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Card title="Article Search" icon="far fa-book">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                handleFrontPageSubmit={this.handleFrontPageSubmit}
                searchTerm={this.state.searchTerm}
              />
              {/* TO DO: Put badges in Form component */}
              <label id="recent" htmlFor="Search Term">
                <strong>Recent Searches:</strong>
              </label>
              <a href="#" class="badge badge-primary" onClick={() => this.getArticles(displayedSearchTerms[0])}>{displayedSearchTerms[0]}</a>
              <a href="#" class="badge badge-secondary" onClick={() => this.getArticles(displayedSearchTerms[1])}>{displayedSearchTerms[1]}</a>
              <a href="#" class="badge badge-success" onClick={() => this.getArticles(displayedSearchTerms[2])}>{displayedSearchTerms[2]}</a>
              <a href="#" class="badge badge-danger" onClick={() => this.getArticles(displayedSearchTerms[3])}>{displayedSearchTerms[3]}</a>
              <a href="#" class="badge badge-warning" onClick={() => this.getArticles(displayedSearchTerms[4])}>{displayedSearchTerms[4]}</a>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results">
              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <Article
                      key={article.objectID}
                      title={article.title}
                      link={article.url}
                      author={article.author}
                      created={article.created_at}
                      Button={() => (
                        <button
                          onClick={() => this.handleArticleSave(article.objectID)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                  <Pagination
                    page={page}
                    hitsPerPage={hitsPerPage}
                    nbHits={nbHits}
                    nbPages={nbPages}
                    stepPage={this.stepPage}
                    toPage={this.toPage}
                  />
                </List>
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  searchTerms: state.searchTerms.allSearchTerms,
});

export default connect(mapStateToProps)(Home);
