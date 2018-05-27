import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';
import ReportConfirm from '../pages/reportConfirm';
import ReportIndex from '../pages/reportIndex';

// <header>
// <Link to="/">Login</Link>
// </header>
const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/reportConfirm" component={ReportConfirm} />
      <Route exact path="/reportIndex" component={ReportIndex} />
    </main>
  </div>
);

export default App;
