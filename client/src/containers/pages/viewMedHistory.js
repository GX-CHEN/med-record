import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { listMedHistory } from '../../action/doctor';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DatePicker, Divider, Table } from 'antd';
import moment from 'moment';

/**
 * This is a page only doctor have access to
 * Not implemented yet, once it's implemented, doctor can see the daily records
 */

const dateFormat = 'MM-DD-YYYY';
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32
  },
  {
    key: '2',
    name: 'John',
    age: 42
  }
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  }
];

class ViewMedHistory extends Component {
  constructor(props) {
    super(props);
    const isDoctor = localStorage.getItem('doctorRole');
    if (isDoctor !== 'true') {
      this.navigateToNoPermission();
    }
    this.state = {
      dateString: null,
      tableData: []
    };
  }

  componentDidMount() {
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

  render() {
    return (
      <div className="form-wrapper centered">
        <Divider className="divider-title centered">Med Date of {this.state.dateString}</Divider>
        <div>
          <DatePicker defaultValue={moment()} format={dateFormat} onChange={this.handleDateSelection} />
          <Table dataSource={dataSource} columns={columns} pagination={false} size="small" />
        </div>
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
    nextPage: state.credential.nextPage
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
