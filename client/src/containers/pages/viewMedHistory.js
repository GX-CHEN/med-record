import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { listMedHistory } from '../../action/doctor';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DatePicker, Divider, Table, Icon } from 'antd';
import { confirmationModal } from '../components/confirmationModal';
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
        localStorage.setItem('userId', '');
        localStorage.setItem('doctorRole', '');
        this.props.changePage('/');
      }
    });
  };

  render() {
    const { dateString, tableData } = this.state;
    return (
      <div className="form-wrapper centered">
        <Divider className="divider-title centered">Med Date of {dateString}</Divider>
        <div>
          <DatePicker
            className="full-width"
            defaultValue={moment()}
            format={dateFormat}
            onChange={this.handleDateSelection}
          />
          <Table dataSource={tableData} columns={columns} pagination={false} size="small" className="clear-fix" />
        </div>
        <Icon type="logout" className="logout-icon" onClick={this.handleLogout} />
      </div>
    );
  }
}

ViewMedHistory.propTypes = {
  listMedHistory: PropTypes.func,
  changePage: PropTypes.func
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
      listMedHistory,
      changePage: (route, payload) => push(route, payload)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewMedHistory);
