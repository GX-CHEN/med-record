import React, { Component } from 'react';
import { Icon, Input, Button, message } from 'antd';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { addMed } from '../../action/doctor';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DoctorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  submitValues = () => {
    try {
      this.props.addMed(this.state.value);
    } catch (e) {
      message.error('something went wrong');
    }
    this.props.changePage('/reportConfirm');
  };

  updateValue = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div className="report-index-form">
        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.updateValue} />
        <Button type="primary" onClick={this.submitValues}>
          Submit
        </Button>
      </div>
    );
  }
}

DoctorDashboard.propTypes = {
  addMed: PropTypes.func,
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
      addMed,
      changePage: (route, payload) => push(route, payload)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorDashboard);
