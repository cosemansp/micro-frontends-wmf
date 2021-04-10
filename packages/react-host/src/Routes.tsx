import { Route, Switch, Redirect } from "react-router-dom";

import Page1 from "./pages/page1";
import Page2 from "./pages/page2";
import React from "react";

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/page1" />
    </Route>
    <Route path="/page1">
      <Page1 />
    </Route>
    <Route path="/page2">
      <Page2 />
    </Route>
  </Switch>
);

export default Routes;
