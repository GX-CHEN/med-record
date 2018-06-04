import React from 'react';
import { Route } from 'react-router-dom';
import ReportConfirm from '../pages/reportConfirm';
import ReportIndex from '../pages/reportIndex';
import Register from '../pages/register';
import Login from '../pages/login';

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/reportIndex" component={ReportIndex} />
      <Route exact path="/reportConfirm" component={ReportConfirm} />
    </main>
  </div>
);

export default App;
