import React from 'react';
import { Route } from 'react-router-dom';
import ReportConfirm from '../pages/reportConfirm';
import ReportIndex from '../pages/reportIndex';

// <header>
// <Link to="/">Login</Link>
// </header>
const App = () => (
  <div>
    <main>
      <Route exact path="/" component={ReportIndex} />
      <Route exact path="/reportConfirm" component={ReportConfirm} />
    </main>
  </div>
);

export default App;
