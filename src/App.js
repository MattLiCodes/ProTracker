import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import StudentPage from './StudentPage.js';
import Analytic from './Analytics.js';
import LoginPage from './LoginPage';
import FloorPlan from './FloorPlan';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/:id/FloorPlan" component = {FloorPlan}/>
        <Route path = "/:id/StudentPage" component = {StudentPage}/>
        <Route path = "/:id/Analytics" component = {Analytic}/>
        <Route path = "/" component = {LoginPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
