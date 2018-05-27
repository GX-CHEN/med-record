import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ReportConfirm extends Component {
  render() {
    return (
      <div>
        <div className="text-xs-left">Report Successfully!!!</div>
        <Link to="/" className="btn btn-danger">
          Go Back
        </Link>
      </div>
    );
  }
}

export default ReportConfirm;
