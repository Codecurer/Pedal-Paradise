import "./App.css";
import Topnavbar from "./components/Topnavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <header>
            <Topnavbar></Topnavbar>
          </header>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
