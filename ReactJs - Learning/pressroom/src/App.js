import React, { useState } from "react";
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import Customenews from './Components/Customenews';

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { routes } from "./Components/Route";

const App = () => {
  const pageLimit = 8;
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, updateProgress] = useState(0);
  const [mode, changeMode] = useState("light");

  const setProgress = (progress) => {
    updateProgress(progress);
  };

  const changeModeToggle = () => {
    if (mode === "light") {
      changeMode("dark");
      document.body.style.backgroundColor = "#042743";
    } else {
      changeMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  return (
    <BrowserRouter>
      <header>
        <LoadingBar color="#f11946" progress={progress} />
        <NavBar topProgress={setProgress}  mode={mode}
          changeModeToggle={changeModeToggle}/>
        {/* {console.log(themeMode)} */}
      </header>
      <Routes>
        {routes.map((routeobject,i) => {
          return (
            <Route 
              exact
              path={routeobject.pathname}
              key={i}
              element={  
                <News
                  apikey={apiKey}
                  topprogress={setProgress}
                  key={i}
                  pagesize={pageLimit}
                  country="in"
                  mode={mode}
                  category={routeobject.category}
                />
              }
            />
          );
        })}
        <Route 
              exact
              path="/Customenews"
              key="10"
              element={  
                <Customenews
                  apikey="http://192.168.29.131:1337/api/savemeta-data"
                  likeAPI="http://192.168.29.131:1337/api/savemeta-data"
                  topprogress={setProgress}
                  key="10"
                  pagesize={pageLimit}
                  mode={mode}
                />
              }
            />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
