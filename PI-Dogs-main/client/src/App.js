import './App.css';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import Landing from "./components/Landing/Landing"
import Details from "./components/Details/Details"
import { Route } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3001"
 

function App() {
  return (
    <div className="App">
      <Route exact path="/">  <Landing />  </Route>
      <Route exact path="/home">  <Home />  </Route>
      <Route exact path="/dogs/:id">  <Details />  </Route>
      <Route exact path="/dog">  <Form />  </Route>
    </div>
  );
}

export default App;
