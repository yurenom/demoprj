import React from "react";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <React.Fragment>
          <Header />
          <Content />
          <Footer />
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
