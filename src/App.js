import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import StudentPage from './StudentPage.js';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/StudentPage" component = {StudentPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
