import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import Store from "./store/index";
import React from 'react';
import './App.css';
import AppRoutes from "./routes";
import Guards from "./routes/guards";
function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <Guards />
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
