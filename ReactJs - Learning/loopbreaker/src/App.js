import "./App.css";
import TopNavbar from "./Components/TopNavbar.js";
import FormText from "./Components/FormText";
import React, { useState } from "react";
import Alert from "./Components/CustomeAlert";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [mode, changeMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({    
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
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
        <TopNavbar
          navbarTitle="First ReactApp"
          mode={mode}
          changeModeToggle={changeModeToggle}
        />
      </header>
      <Routes>
        <Route
          exact
          path="/about"
          element={
            <>
              <Alert alert={alert} />
              <FormText
                mode={mode}
                heading="Enter your own text and convert into UpperCase OneClick"
                showAlert={showAlert}
              />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
