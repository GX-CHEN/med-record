import React, { Component } from 'react';
import { Button, Divider, Icon } from 'antd';
import { confirmationModal } from '../components/confirmationModal';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { logout } from '../../action/credential';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * doctorDashboard contains two buttons
 * 1. Manage Meds
 * 2. Display user daily reporting record
 */
class DoctorDashboard extends Component {
  componentDidMount() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.props.changePage('/');
    }
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

  handleLogout = () => {
    confirmationModal({
      onOk: () => {
        localStorage.setItem('userId', '');
        localStorage.setItem('doctorRole', '');
        this.props.logout();
        this.props.changePage('/');
      }
    });
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
        <Icon type="logout" className="logout-icon" onClick={this.handleLogout} />
      </div>
    );
  }
}

DoctorDashboard.propTypes = {
  changePage: PropTypes.func,
  logout: PropTypes.func
};

const mapStateToProps = state => {
  return {
    nextPage: state.credential.nextPage
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      changePage: (route, payload) => push(route, payload)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorDashboard);
