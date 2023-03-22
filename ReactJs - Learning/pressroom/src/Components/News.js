import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Container from "react-bootstrap/Container";
import Loading from "./Loading.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, Setarticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const updateNews = React.useCallback(async () => {

    props.topprogress(65);
    setPage(page + 1);

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pagesize}`;

    setLoading(true);

    props.topprogress(80);
    let data = await fetch(url);
    props.topprogress(90);
    let dataParse = await data.json();
    props.topprogress(100);
    Setarticles(articles.concat(dataParse.articles));
    setTotalPage(dataParse.totalResults);
    setLoading(false);

  }, [props, page, articles]);

  useEffect(() => {
    document.title = `${props.category} - Headlines`;
    updateNews();
    //eslint-disable-next-line
  }, []);
  
  return (
    <>
      <h1
        className="text-center"
        style={{
          color: `${props.mode === "light" ? "black" : "white"}`,
          marginTop: "80px",
        }}
      >
        Meet's Press Room - Top{" "}
        {props.category.charAt(0).toUpperCase() +
          props.category.slice(1, props.category.length)}{" "}
        Headlines
      </h1>
      {loading && <Loading />}
      <InfiniteScroll
        dataLength={articles.length}
        next={updateNews}
        hasMore={articles.length !== totalPage}
        loader={<Loading />}
      >
        <Container className="my-4">
          <div className="row my-4">
            {articles.map((data, index) => {
              return (
                <div className="col-md-3" key={index}>
                  <NewsItem
                    title={!data.title ? "undefind" : data.title}
                    description={data.description}
                    urlImage={data.urlToImage}
                    newsUrl={data.url}
                    author={data.author}
                    publishDate={data.publishedAt}
                    source={data.source.name}
                    mode={props.mode}
                  />
                </div>
              );
            })}
          </div>
        </Container>
      </InfiniteScroll>
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

News.defaultProps = {
  country: "in",
  pagesize: 4,
  category: "science",
};
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
