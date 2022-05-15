import logo from './logo.svg';
import './App.css';

import Home from './Module';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Module from './Module';


function App() {
  return (
    <div>
      <div className = 'App container'>
        <h3 className = 'd-flex justify-content-center m-3'>
          My Study Plan
        </h3>

        <Router>
          <nav className = "navbar navbar-expand-sm bg-light navbar-dark">
            <ul className="navbar-nav">
              <li className="nav-item- m-1">
                <Link className = 'btn btn-light btn-outline-primary' to = './Module'>Modules</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path = '/Module' element = {<Module/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
