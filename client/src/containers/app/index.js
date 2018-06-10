import React from 'react';
import { Route } from 'react-router-dom';
import ReportTakeMed from '../pages/reportTakeMed';
import DoctorDashboard from '../pages/doctorDashboard';
import ViewMedHistory from '../pages/viewMedHistory';
import ManageMed from '../pages/manageMed';
import Register from '../pages/register';
import Login from '../pages/login';
import NoPermission from '../pages/noPermission';

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/doctorDashboard" component={DoctorDashboard} />
      <Route exact path="/viewMedHistory" component={ViewMedHistory} />
      <Route exact path="/manageMed" component={ManageMed} />
      <Route exact path="/reportTakeMed" component={ReportTakeMed} />
      <Route exact path="/noPermission" component={NoPermission} />
    </main>
  </div>
);

export default App;
