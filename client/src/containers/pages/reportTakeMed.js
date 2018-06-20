import React, { Component } from 'react';
import { List, Button, Divider, Icon, message } from 'antd';
import { confirmationModal } from '../components/confirmationModal';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { logout } from '../../action/credential';
import { listMed } from '../../action/doctor';
import { reportTime, checkWetherReported } from '../../action/patient';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

/**
 * The patient report will result in two possible situations:
 * 1. When success, a in-page success message will display
 * 2. If something goes wrong, then in-page error message will display
 * For the confirmation of success/failure, we don't need to navigate to another page
 */
class ReportTakeMed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medList: [],
      isAlreadyReported: false
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.props.changePage('/');
    }

    this.props.listMed();
    const dateString = moment().format('MM-DD-YYYY');
    this.props.checkWetherReported(userId, dateString);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      !isEqual(nextProps.medList, prevState.medList) ||
      !isEqual(nextProps.isAlreadyReported, prevState.isAlreadyReported) ||
      !isEqual(nextProps.reportSucceed, prevState.reportSucceed)
    ) {
      return {
        medList: nextProps.medList,
        isAlreadyReported: nextProps.isAlreadyReported || nextProps.reportSucceed
      };
    }
    return null;
  }

  submitValues = () => {
    try {
      const dateString = moment().format('MM-DD-YYYY');
      const userId = localStorage.getItem('userId');
      this.props.reportTime(userId, dateString);
      message.success('Time report succeeded');
    } catch (e) {
      message.error('something went wrong');
    }
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
    const today = moment().format('LL');
    return (
      <div className="form-wrapper">
        <h3 className="centered">Report Date: {today}</h3>
        {this.state.isAlreadyReported && (
          <h4 style={{ color: 'orange' }} className="centered">
            Good job! Already reported!
          </h4>
        )}
        <Divider />
        <List
          header={<div style={{ fontWeight: 'bold' }}>Your Medicines</div>}
          bordered
          dataSource={this.state.medList}
          renderItem={item => <List.Item>{item.name}</List.Item>}
        />
        <Divider />
        <Button type="primary" onClick={this.submitValues} disabled={this.state.isAlreadyReported}>
          Report Medicine Taken
        </Button>
        <Icon type="logout" className="logout-icon" onClick={this.handleLogout} />
      </div>
    );
  }
}

ReportTakeMed.propTypes = {
  reportTime: PropTypes.func,
  listMed: PropTypes.func,
  checkWetherReported: PropTypes.func,
  changePage: PropTypes.func,
  logout: PropTypes.func
};

const mapStateToProps = state => {
  return {
    medList: state.doctor.medList,
    nextPage: state.credential.nextPage,
    isAlreadyReported: state.patient.isAlreadyReported,
    reportSucceed: state.patient.reportSucceed
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      reportTime,
      checkWetherReported,
      listMed,
      logout,
      changePage: (route, payload) => push(route, payload)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportTakeMed);
