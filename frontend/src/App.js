import React, { Component } from "react";
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Expenses from "./components/Expenses";
import NotFound from "./components/NotFound";

class App extends Component {

  render() {
    return (
      <main className="content">
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Expenses} />
          <Route component={NotFound} />
        </Switch>
        </BrowserRouter>
      </main>
    );
  }

}
export default App;