import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { addTime } from '../../model/apiService';

class ReportIndex extends Component {
  
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
      register,
      changePage: payload => push('/', payload)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ReportIndex);