import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Form from './components/form/Form'
import Confirm from "./components/form/Confirm";
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/:coffee_style/:hash" component={Confirm} />

          <Route path="/">
            <Form />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
