import './App.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Dashboard from './Dashboard';
import Team from './Team';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/team">
              <Team />
            </Route>
          </Switch>
        </div>
      <Footer />
      </div>
    </Router>

  );
}

export default App;
