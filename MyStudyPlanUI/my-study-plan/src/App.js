import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Module from './Pages/Module/Module';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  return (
    <div>
      <div className = 'App container'>
        <h3 className = 'd-flex justify-content-center m-3'>
          My Study Plan
        </h3>

        <Router>
          <nav className = "navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
            <ul className="navbar-nav">
              <li className="nav-item m-1">
                <Link className = 'btn btn-dark btn-outline-primary' to = './'>Dashboard</Link>
              </li>
              <li className="nav-item m-1">
                <Link className = 'btn btn-dark btn-outline-primary' to = './Module'>Modules</Link>
              </li>
              <li className="nav-item m-1">
                <Link className = 'btn btn-dark btn-outline-primary' to = ''>Assignment</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path = '/' element = {<Dashboard/>} />
            <Route path = '/Module' element = {<Module/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
