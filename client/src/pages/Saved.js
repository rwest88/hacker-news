import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Article from "../components/Article";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Saved extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    this.getSavedArticles();
  }

  getSavedArticles = () => {
    API.getSavedArticles()
      .then(res =>
        this.setState({
          articles: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleArticleExpand = id => {
    let { articles } = this.state;
    let index = articles.findIndex(e => e.hackernewsId === id);
    API.getArticle(id)
      .then(res => {
        console.log(res.data);
        articles[index] = {
          ...articles[index],
          children: res.data.children
        };
        this.setState({
          articles
        });
      })
  }

  handleArticleDelete = id => {
    API.deleteArticle(id).then(res => this.getSavedArticles());
  };

  render() {
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
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Saved Articles" icon="download">
              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <Article
                      key={article._id}
                      title={article.title}
                      created={article.created}
                      link={article.url}
                      author={article.author}
                      comments={article.children}
                      Button={() => (
                        <button
                          onClick={() => this.handleArticleDelete(article._id)}
                          className="btn btn-danger ml-2"
                        >
                          Delete
                        </button>
                      )}
                      Button2={() => (
                        <button
                          onClick={() => this.handleArticleExpand(article.hackernewsId)}
                          className="btn btn-primary ml-2"
                        >
                          See Comments
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">No Saved Articles</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Saved;
