import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ConfigList from "./components/ConfigList";
import NewConfigForm from "./components/NewConfigForm";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="app-container">
        <Route path="/" exact component={ConfigList} />
        <Route path="/newConfig" exact component={NewConfigForm} />
      </div>
    </BrowserRouter>
  );
}

export default App;
