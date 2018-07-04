import React, { Component } from 'react';
import { Button, Divider, Icon } from 'antd';
import { confirmationModal } from '../components/confirmationModal';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { logout } from '../../action/credential';
import { clearReportingData } from '../../action/patient';
import { connect } from 'react-redux';
import { clearLocalStorage, changeLanguage } from '../../model/utils';
import text from '../../const/text';
import PropTypes from 'prop-types';

/**
 * doctorDashboard contains two buttons
 * 1. Manage Meds
 * 2. Display user daily reporting record
 */
class DoctorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: localStorage.getItem('language')
    };
  }

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
        clearLocalStorage();
        this.props.logout();
        this.props.clearReportingData();
        this.props.changePage('/');
      }
    });
  };

  render() {
    return (
      <div className="form-wrapper">
        <Divider>
          <span style={{ fontSize: '24px', color: 'gray' }}>{text.helloDoctor}</span>
        </Divider>
        <Button type="primary" onClick={this.navigateToMedHistory}>
          {text.viewMedHistory}
        </Button>
        <Button onClick={this.navigateToMedManagement}>{text.managesMedicine}</Button>
        <Icon type="logout" className="logout-icon" onClick={this.handleLogout} />
        <Button
          type="primary"
          shape="circle"
          className="language-button"
          onClick={changeLanguage.bind(this, this.state.language)}>
          {this.state.language === 'en' ? '中' : 'EN'}
        </Button>
      </div>
    );
  }
}

DoctorDashboard.propTypes = {
  changePage: PropTypes.func,
  logout: PropTypes.func,
  clearReportingData: PropTypes.func
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
      clearReportingData,
      changePage: (route, payload) => push(route, payload)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorDashboard);
