import React, { Component } from 'react';
import { Icon, Input, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { addTime } from '../../action/patientData';
import { connect } from 'react-redux';

class ReportIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  submitValues = () => {
    try {
      this.props.addTime(this.state.value);
    } catch (e) {
      console.error(e);
    }
    this.props.changePage('/reportConfirm');
  };

  updateValue = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div className="report-index-form" >
        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.updateValue} />
        <Button type="primary" onClick={this.submitValues}>
          Submit
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.credential.payload,
    nextPage: state.credential.nextPage
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addTime,
      changePage: (route, payload) => push(route, payload)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ReportIndex);
