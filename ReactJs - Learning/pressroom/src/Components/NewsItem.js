import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export class NewsItem extends Component {
  render() {
    let { title, description, urlImage, newsUrl, author, publishDate, source } =
      this.props;
    return (
      <>
        <div>
          <button type="button" className="btn btn-sm btn-danger my-3">
            {source}{" "}
            <span className="position-absolute top-0 translate-middle badge rounded-pill gb-danger badge-light"></span>
          </button>
        </div>
        <Card>
          <Card.Img
            variant="top"
            src={
              !urlImage
                ? "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2023/02/btc.jpg?fit=2048%2C1364&quality=55&strip=all&ssl=1"
                : urlImage
            }
          />
          <Card.Body>
            <Card.Title>{!title ? "Undefind" : title.slice(0,20)}...</Card.Title>
            <Card.Text>{!description? "Undefind Description" : description.slice(0,50)}...</Card.Text>
            <Card.Footer className="mb-3">
              <small className="text-muted">
                By {!author ? "Unknwon" : author} on {" "}
                {new Date(publishDate).toGMTString()}
              </small>
            </Card.Footer>
            <Button variant="dark" href={newsUrl} target="_blank">
              Read more...
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default NewsItem;
