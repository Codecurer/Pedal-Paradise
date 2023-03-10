import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Loading from "./Loading.js";
import PropTypes from "prop-types";

export class News extends Component {
  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  static defaultProps = {
    pageSize: 4,
    country: "in",
    category: "general",
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.props.category} - Headlines`
  }

  updateNews = async (status) => {
    let url;
    if (status) {
      url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=bba01e85c5094de2a6d9c12ff046e704&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=bba01e85c5094de2a6d9c12ff046e704&page=${
        this.state.page - 1
      }&pageSize=${this.props.pageSize}`;
    }
    this.setState({ loading: true });
    let data = await fetch(url);
    let dataParse = await data.json();
    this.setState({
      articles: dataParse.articles,
      totalPages: dataParse.totalResults,
      loading: false,
    });
  };

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews(true);
  };

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews(false);
  };

  render() {
    return (
      <Container className="my-4">
        <h1 className="text-center mx-auto">
          Meet's Press Room -{" "}
          {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1, this.props.category.length)}{" "}
          Top Headlines
        </h1>
        {this.state.loading && <Loading />}
        {console.log(this.state.articles)}
        <div className="row my-4">
          {!this.state.loading &&
            this.state.articles.map((data) => {
              return (
                <div className="col-md-3" key={data.url}>
                  <NewsItem
                    title={data.title}
                    description={data.description}
                    urlImage={data.urlToImage}
                    newsUrl={data.url}
                    author={data.author}
                    publishDate={data.publishedAt}
                    source={data.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-between">
          <Button
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
            variant={this.state.page <= 1 ? "secondary" : "success"}
          >
            {" "}
            &larr; Previous
          </Button>{" "}
          <Button variant="secondary" disabled={true}>Page {this.state.page} - {Math.ceil(this.state.totalPages / this.props.pageSize)}</Button>
          <Button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalPages / this.props.pageSize)
            }
            onClick={this.handleNextClick}
            variant={
              this.state.page + 1 >
              Math.ceil(this.state.totalPages / this.props.pageSize)
                ? "secondary"
                : "success"
            }
          >
            Next &rarr;
          </Button>{" "}
        </div>
      </Container>
    );
  }
}

export default News;
