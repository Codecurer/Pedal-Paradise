import React, { useState, useEffect } from "react";

export const Allcustomenews = (props) => {
  const [newsAPI, setNewsAPI] = useState(
    "http://192.168.29.131:1337/api/news-infos/"
  );
  const [news, setNews] = useState([]);

  const updateNews = React.useCallback(async () => {
    // setPage(page+1);

    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   props.country
    // }&category=${props.category}&apiKey=${props.apiKey}&page=${
    //   page
    // }&pageSize=${props.pageSize}`;

    let data = await fetch(newsAPI, {
      method: "GET",
      headers: {
        accept: "application.json",
        "Content-Type": "application/json",
      },
    });

    let dataParse = await data.json();

    setNews(dataParse.data.attributes);
    // setTotalPage(dataParse.totalResults);
  }, [newsAPI, news]);

  useEffect(() => {
    return () => updateNews();
  }, []);

  return <h1>helloooo all news</h1>;
};

export default Allcustomenews;
