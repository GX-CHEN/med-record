import React, { Component } from 'react';
import { Icon, Input, Button, message } from 'antd';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { addTime } from '../../action/patient';
import { connect } from 'react-redux';
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
      value: ''
    };
  }

  submitValues = () => {
    try {
      this.props.addTime(this.state.value);
      message.success("Time report succeeded")
    } catch (e) {
      message.error('something went wrong');
    }
  };

  updateValue = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div className="form-wrapper">
        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.updateValue} />
        <Button type="primary" onClick={this.submitValues}>
          Submit
        </Button>
      </div>
    );
  }
}

ReportTakeMed.propTypes = {
  addTime: PropTypes.func,
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
      addTime,
      changePage: (route, payload) => push(route, payload)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportTakeMed);
