import React from "react";
import moment from "moment";
import { ListItem } from "../List";
import { Row, Col } from "../Grid";
import "./style.css";

function Article({ title, created, author, link, Button, Button2, comments }) {
  console.log('children', comments)
  return (
    <ListItem>
      <Row className="flex-wrap-reverse">
        <Col size="md-8">
          <h3 className="font-italic">{title}</h3>
          {created && <h5 className="font-italic">{moment(created).format("MMMM Do, YYYY")}</h5>}
          <p className="font-italic small">Written by {author}</p>
        </Col>
        <Col size="md-4">
          <div className="btn-container">
            <a className="btn btn-light ml-2" target="_blank" rel="noopener noreferrer" href={link}>
              View
            </a>
            {Button2 ? <Button2 /> : null}
            <Button />
          </div>
        </Col>
      </Row>
      <Row>
        {/* <Col size="12 sm-4 md-2">
          <img className="img-thumbnail img-fluid w-100" src={undefined} alt={title} />
        </Col> */}
        <Col size="12">
          <ol>{comments && comments.slice(0, 10).map(e => <li>{e.text}</li>)}</ol>
        </Col>
      </Row>
    </ListItem>
  );
}

export default Article;
