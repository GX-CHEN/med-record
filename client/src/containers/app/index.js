import React from 'react';
import { Route } from 'react-router-dom';
import ReportConfirm from '../pages/reportConfirm';
import ReportTakeMed from '../pages/reportTakeMed';
import DoctorDashboard from '../pages/doctorDashboard';
import ViewMedHistory from '../pages/viewMedHistory';
import Register from '../pages/register';
import Login from '../pages/login';

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/doctorDashboard" component={DoctorDashboard} />
      <Route exact path="/viewMedHistory" component={ViewMedHistory} />
      <Route exact path="/reportTakeMed" component={ReportTakeMed} />
      <Route exact path="/reportConfirm" component={ReportConfirm} />
    </main>
  </div>
);

export default App;
