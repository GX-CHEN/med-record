import React from 'react';

/**
 * This page is to be display when user don't have permission to a page
 * For example: is patients want to go to doctorDashboard by URL, he/she will see this page intead
 */
const NoPermission = () => (
  <div className="centered">
    <p>You have No Permission to access this page</p>
  </div>
);

export default NoPermission;
