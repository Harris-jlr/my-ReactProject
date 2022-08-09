import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Discussions from './pages/Discussions';
import Team from './pages/Team';
import Category from './pages/Category';
import Projects from './pages/Projects';
import TeamCalendar from './components/TeamCalendar';
import Portal from './components/Portal';
import UserQuestions from './components/UserQuestions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <div className="Content ">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/Discussions">
              <Discussions />
            </Route>
            <Route path="/team">
              <Team />
            </Route>
            <Route path="/Category">
              <Category />
            </Route>
            <Route path="/Projects">
              <Projects />
            </Route>
            <Route path="/TeamCalendar">
              <TeamCalendar />
            </Route>
            <Route path="/UserQuestions">
              <UserQuestions />
            </Route>
            <Route path="/Portal">
              <Portal />
            </Route>
          </Switch>
        </div>
      <Footer />
      </div>
    </Router>

  );
}

export default App;
