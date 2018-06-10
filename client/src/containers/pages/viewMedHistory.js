import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { listMedHistory } from '../../action/doctor';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * This is a page only doctor have access to
 * Not implemented yet, once it's implemented, doctor can see the daily records
 */
class ViewMedHistory extends Component {
  constructor(props) {
    super(props);
    const isDoctor = localStorage.getItem('doctorRole');
    if (isDoctor !== 'true') {
      this.navigateToNoPermission();
    }
  }

  render() {
    return <div className="form-wrapper">Medical Hostory Record Table</div>;
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
