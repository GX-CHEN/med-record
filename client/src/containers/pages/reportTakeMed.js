import React, { Component } from 'react';
import { List, Button, Divider, message } from 'antd';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { listMed } from '../../action/doctor';
import { reportTime } from '../../action/patient';
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
      buttonDisable: false
    };
  }

  componentDidMount() {
    this.props.listMed();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.medList, prevState.medList)) {
      return {
        medList: nextProps.medList
      };
    }
    return null;
  }

  submitValues = () => {
    try {
      const dateString=moment().format('DD-MM-YYYY');
      const userId = localStorage.getItem('userId');
      this.props.reportTime(userId, dateString);
      this.setState({ buttonDisable: true });
      message.success('Time report succeeded');
    } catch (e) {
      message.error('something went wrong');
    }
  };

  render() {
    const today = moment().format('LL');
    return (
      <div className="form-wrapper">
        <h3 className="centered">Report Date: {today}</h3>
        <Divider />
        <List
          header={<div style={{ fontWeight: 'bold' }}>Your Medicines</div>}
          bordered
          dataSource={this.state.medList}
          renderItem={item => <List.Item>{item.name}</List.Item>}
        />
        <Divider />
        <Button type="primary" onClick={this.submitValues} disabled={this.state.buttonDisable}>
          Report Medicine Taken
        </Button>
      </div>
    );
  }
}

ReportTakeMed.propTypes = {
  reportTime: PropTypes.func,
  listMed: PropTypes.func,
  changePage: PropTypes.func
};

const mapStateToProps = state => {
  return {
    medList: state.doctor.medList,
    nextPage: state.credential.nextPage
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      reportTime,
      listMed,
      changePage: (route, payload) => push(route, payload)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportTakeMed);
