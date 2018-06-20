import React, { Component } from 'react';
import { Button, Divider } from 'antd';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * doctorDashboard contains two buttons
 * 1. Manage Meds
 * 2. Display user daily reporting record
 */
class DoctorDashboard extends Component {
  constructor(props) {
    super(props);
    const isDoctor = localStorage.getItem('doctorRole');
    if (isDoctor !== 'true') {
      this.navigateToNoPermission();
    }
  }

  navigateToMedHistory = () => {
    this.props.changePage('/viewMedHistory');
  };

  navigateToMedManagement = () => {
    this.props.changePage('/manageMed');
  };

  navigateToNoPermission = () => {
    this.props.changePage('/noPermission');
  };

  render() {
    return (
      <div className="form-wrapper">
        <Divider>
          <span style={{ fontSize: '24px', color: 'gray' }}>Welcome, Doctor!</span>
        </Divider>
        <Button type="primary" onClick={this.navigateToMedHistory}>
          View Med History
        </Button>
        <Button onClick={this.navigateToMedManagement}>Manages Medicine</Button>
      </div>
    );
  }
}

DoctorDashboard.propTypes = {
  changePage: PropTypes.func
};

const mapStateToProps = state => {
  return {
    nextPage: state.credential.nextPage
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: (route, payload) => push(route, payload)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorDashboard);
