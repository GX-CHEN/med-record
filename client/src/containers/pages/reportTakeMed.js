import React, { Component } from 'react';
import { List, Button, Divider, Icon, message } from 'antd';
import { confirmationModal } from '../components/confirmationModal';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { logout } from '../../action/credential';
import { clearReportingData } from '../../action/patient';
import { listMed } from '../../action/doctor';
import { reportTime, checkWetherReported } from '../../action/patient';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { clearLocalStorage } from '../../model/utils';
import text from '../../const/text';
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
      isAlreadyReported: false,
      loading: false,
      language: localStorage.getItem('language')
    };
  }

  componentDidMount() {
    this.handleReload();
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
        clearLocalStorage();
        this.props.logout();
        this.props.clearReportingData();
        this.props.changePage('/');
      }
    });
  };

  changeLanguage = () => {
    if (this.state.language === 'en') {
      localStorage.setItem('language', 'cn');
    } else {
      localStorage.setItem('language', 'en');
    }
    window.location.reload();
  };

  handleReload = () => {
    this.setState({ loading: true });
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.props.changePage('/');
    }

    this.props.listMed();
    const dateString = moment().format('MM-DD-YYYY');
    this.props.checkWetherReported(userId, dateString);
    setTimeout(() => {
      this.setState({ loading: false });
      message.success('Data Updated', 1);
    }, 1000);
  };

  render() {
    const today = moment().format('LL');
    const username = localStorage.getItem('username');
    return (
      <div className="form-wrapper">
        <h3 className="centered">
          {text.hello}, {username}!
        </h3>
        <h3 className="centered">
          {text.reportTime}: {today}
        </h3>
        {this.state.isAlreadyReported && (
          <h4 style={{ color: 'orange' }} className="centered">
            {text.confirmMedTaken}
          </h4>
        )}
        <Divider />
        <List
          header={<div style={{ fontWeight: 'bold' }}>{text.yourMeds}</div>}
          bordered
          dataSource={this.state.medList}
          renderItem={item => <List.Item>{item.name}</List.Item>}
        />
        <Divider />
        <Button type="primary" onClick={this.submitValues} disabled={this.state.isAlreadyReported}>
          {text.reportMedTaken}
        </Button>
        <Icon type="logout" className="logout-icon" onClick={this.handleLogout} />
        <Icon type={this.state.loading ? 'loading' : 'reload'} className="reload-icon" onClick={this.handleReload} />
        <Button type="primary" shape="circle" className="language-button" onClick={this.changeLanguage}>
          {this.state.language === 'en' ? '中' : 'EN'}
        </Button>
      </div>
    );
  }
}

ReportTakeMed.propTypes = {
  reportTime: PropTypes.func,
  listMed: PropTypes.func,
  checkWetherReported: PropTypes.func,
  changePage: PropTypes.func,
  logout: PropTypes.func,
  clearReportingData: PropTypes.func
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
      clearReportingData,
      changePage: (route, payload) => push(route, payload)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportTakeMed);
