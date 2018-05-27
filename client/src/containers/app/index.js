import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';

// <header>
// <Link to="/">Login</Link>
// </header>
const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
    </main>
  </div>
);

export default App;
