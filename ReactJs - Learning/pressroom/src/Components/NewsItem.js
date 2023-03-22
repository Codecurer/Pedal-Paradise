import React,  {useState} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NewsItem = (props) => {
  let {
    title,
    description,
    urlImage,
    newsUrl,
    author,
    publishDate,
    source,
    likeOption,
  } = props;

  const [like, setLike] = useState(false);

  const handleLikePost = async () => {
    let data = await fetch(props.serverPort, {
      method: "POST",
      headers: {
        accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        uid: "#R458GH",
      }),
    });
    setLike(true);
  }
  return (
    <Card
      className="my-3"
      style={{ border: `${props.mode === "light" ? "" : "3px solid white"}` }}
    >
      <Badge
        bg="danger"
        style={{
          display: "flex",
          position: "absolute",
          right: "0",
          justifyContent: "flex-end",
        }}
        className="m-1"
      >
        {source}
      </Badge>{" "}
      <Card.Img
        variant="top"
        src={
          !urlImage
            ? "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2023/02/btc.jpg?fit=2048%2C1364&quality=55&strip=all&ssl=1"
            : urlImage
        }
      />
      <Card.Body
        style={{
          color: `${props.mode === "light" ? "black" : "white"}`,
          backgroundColor: `${props.mode === "light" ? "white" : "#042743"}`,
        }}
      >
        <Card.Title>{!title ? "Undefind" : title.slice(0, 20)}...</Card.Title>
        <Card.Text>
          {!description ? "Undefind Description" : description.slice(0, 50)}
          ...
        </Card.Text>
        <Card.Footer className="mb-3">
          <small
            className="text-secondary"
            style={{ color: `${props.mode === "light" ? "black" : "white"}` }}
          >
            By {!author ? "Unknwon" : author} on{" "}
            {new Date(publishDate).toGMTString()}
          </small>
        </Card.Footer>
        <Row>
          {likeOption ? (
            <Col>
              {" "}
              <Button onClick={handleLikePost} variant={`${ like ? "success" : "primary"}`}>
                <i className="fa-solid fa-thumbs-up"></i>
              </Button>
            </Col>
          ) : (
            ""
          )}
          <Col>
            {" "}
            <Button
              variant={`${props.mode === "light" ? "dark" : "light"}`}
              href={newsUrl}
              target="_blank"
            >
              Read more...
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default NewsItem;
