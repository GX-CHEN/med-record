import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { listMedHistory } from '../../action/doctor';
import { logout } from '../../action/credential';
import { clearReportingData } from '../../action/patient';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DatePicker, Divider, Table, Icon } from 'antd';
import { confirmationModal } from '../components/confirmationModal';
import { clearLocalStorage } from '../../model/utils';
import text from '../../const/text';
import moment from 'moment';
import { isEqual } from 'lodash';

/**
 * This is a page only doctor have access to
 * Not implemented yet, once it's implemented, doctor can see the daily records
 */

const dateFormat = 'MM-DD-YYYY';

const columns = [
  {
    title: 'Name',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: 'Reported',
    dataIndex: 'reported',
    key: 'reported'
  }
];

class ViewMedHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateString: null,
      tableData: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.tableData, prevState.tableData)) {
      return { tableData: nextProps.tableData };
    }
    return null;
  }

  navigateToNoPermission = () => {
    this.props.changePage('/noPermission');
  };

  navigateHome = () => {
    this.props.changePage('/doctorDashboard');
  };

  componentDidMount() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.props.changePage('/');
    }

    const isDoctor = localStorage.getItem('doctorRole');
    if (isDoctor !== 'true') {
      this.navigateToNoPermission();
    }

    const dateString = moment().format('MM-DD-YYYY');
    this.props.listMedHistory(dateString);
    this.setState({ dateString });
  }

  handleDateSelection = (date, dateString) => {
    if (dateString) {
      this.props.listMedHistory(dateString);
      this.setState({ dateString });
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

  render() {
    const { dateString, tableData } = this.state;

    let formattedTableData = [];
    if (tableData) {
      formattedTableData = tableData.map(row => {
        const { key, username, reported } = row;
        return {
          key,
          username,
          reported:
            reported === 'Yes' ? (
              <Icon type="check" style={{ color: 'green' }} />
            ) : (
              <Icon type="close" style={{ color: 'red' }} />
            )
        };
      });
    }

    return (
      <div className="form-wrapper centered">
        <Divider className="divider-title centered">
          {text.reportTime} {dateString}
        </Divider>
        <div>
          <DatePicker
            className="full-width"
            defaultValue={moment()}
            format={dateFormat}
            onChange={this.handleDateSelection}
          />
          <Table
            dataSource={formattedTableData}
            columns={columns}
            pagination={false}
            size="small"
            className="clear-fix"
            style={{ marginBottom: 100 }}
          />
        </div>
        <Icon type="logout" className="logout-icon" onClick={this.handleLogout} />
        <Icon type="home" className="home-icon" onClick={this.navigateHome} />
      </div>
    );
  }
}

ViewMedHistory.propTypes = {
  listMedHistory: PropTypes.func,
  changePage: PropTypes.func,
  logout: PropTypes.func,
  clearReportingData: PropTypes.func
};

const mapStateToProps = state => {
  return {
    userId: state.credential.payload,
    nextPage: state.credential.nextPage,
    tableData: state.doctor.tableData
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      listMedHistory,
      clearReportingData,
      changePage: (route, payload) => push(route, payload)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewMedHistory);
