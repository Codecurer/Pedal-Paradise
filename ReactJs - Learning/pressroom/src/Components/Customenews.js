import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InfiniteScroll from "react-infinite-scroll-component";

const Customenews = (props) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customeUrl, setURL] = useState(
    "https://timesofindia.indiatimes.com/videos/entertainment/hindi/i-am-proud-to-be-an-indian-jaya-bachchan-hails-indian-film-fraternity-for-receiving-two-oscars-awards/videoshow/98646759.cms"
  );

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const updateNews = React.useCallback(async () => {
    props.topprogress(10);

    let serverPort = props.apikey;

    setLoading(true);

    props.topprogress(50);

    await fetch(serverPort, {
      method: "POST",
      headers: {
        accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: customeUrl,
      }),
    });

    props.topprogress(90);

    props.topprogress(100);
    setLoading(false);
  }, [props, news, customeUrl]);

  const allNews = React.useCallback(async () => {

    props.topprogress(10);

    let serverPorts = "http://192.168.29.131:1337/api/news-infos/";

    setLoading(true);

    props.topprogress(50);

    let data = await fetch(serverPorts, {
      method: "GET",
      headers: {
        accept: "application.json",
        "Content-Type": "application/json",
      },
    });

    props.topprogress(90);

    let dataParses = await data.json();
    setNews(dataParses.data);

    props.topprogress(100);

    setLoading(false);
  }, [props, news]);

  useEffect(() => {
    document.title = `Top News - Headlines`;
    allNews();
    //eslint-disable-next-line
  }, []);

  const handleChange = (event) => {
    setURL(event.target.value);
  };

  const handleInput = async () => {
    await updateNews();
    await allNews();
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1
              className="text-center"
              style={{
                color: `${props.mode === "light" ? "black" : "white"}`,
                marginTop: "80px",
                alignContent: "center",
              }}
            >
              Meet's Press Room{" "}
            </h1>
          </Col>
          <Col>
            <Button
              varient="primary"
              className="mx-2"
              onClick={handleInput}
              style={{ marginTop: "80px", float: "right" }}
            >
              Find
            </Button>
            <Form.Control
              type="url"
              onChange={handleChange}
              style={{
                color: `${props.mode === "light" ? "black" : "#ff0000"}`,
                marginTop: "80px",
                width: "250px",
                float: "right",
              }}
            />
          </Col>
        </Row>
      </Container>
      <InfiniteScroll
        dataLength={news.length}
        next={allNews}
        hasMore={news.length !== 6}
        loader={"<Loading />"}
      >
        <Container className="my-4">
          <div className="row my-4">
            {news.map((data, index) => {
              //  console.log(data.attributes);
              // console.log(n++);
              data = data.attributes;
              return (
                <div className="col-md-3" key={index}>
                  <NewsItem
                    title={!data.title ? "undefind" : data.title}
                    id={data.id}
                    description={data.description}
                    urlImage={data.image}
                    newsUrl={data.url}
                    author={data.author}
                    publishDate={data.createdAt}
                    source={data.source}
                    mode={props.mode}
                    likeOption={true}
                    serverPort={props.likeAPI}
                  />
                </div>
              );
            })}
          </div>
        </Container>
      </InfiniteScroll>
      {/* </InfiniteScroll> */}
      {/* <div className="d-flex justify-content-between">
          <Button
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
            variant={this.state.page <= 1 ? "secondary" : "success"}
          >
            {" "}
            &larr; Previous
          </Button>{" "}
          <Button variant="secondary" disabled={true}>Page {this.state.page} - {Math.ceil(this.state.totalPage / props.pageSize)}</Button>
          <Button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalPage / props.pageSize)
            }
            onClick={this.handleNextClick}
            variant={
              this.state.page + 1 >
              Math.ceil(this.state.totalPage / props.pageSize)
                ? "secondary"
                : "success"
            }
          >
            Next &rarr;
          </Button>{" "}
        </div> */}
    </>
  );
};

// News.defaultProps = {
//   country: "in",
//   pageSize: 4,
//   category: "science",
// };
// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
// };
// Customenews.defaultProps = {
//   country: 'in',
//   pagesize: 4,
//   category: 'science',
// };
// News.propTypes = {
//   country: PropTypes.string,
//   pagesize: PropTypes.number,
//   category: PropTypes.string,
// };
export default Customenews;
