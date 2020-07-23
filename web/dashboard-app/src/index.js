import "fontsource-roboto/latin-ext.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Teacher from './pages/Teacher.js';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Teacher />
          </Route>
        </Switch>
      </Router>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
