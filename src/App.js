import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';
import Notfound from './components/Notfound';
import{BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Neosoft Technologies</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#"><Link to="/">Home</Link> </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="#"><Link to="/add">Add</Link></a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" ><Link to="/edit">Update</Link> <span className="sr-only"></span></a>
                </li>
                
                <li className="nav-item">
                  <a className="nav-link" >Link</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="#">Disabled</a>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </nav>
          <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/add" exact component={Add}></Route>
          <Route path="/edit" exact component={Edit}></Route>
          <Route component={Notfound}></Route>
          </Switch>
          </Router>
    
    </>
  );
}

export default App;
