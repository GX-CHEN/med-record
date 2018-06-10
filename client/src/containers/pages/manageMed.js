import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { deleteMed, addMed, listMed } from '../../action/doctor';
import { connect } from 'react-redux';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { List, Divider, Input, Icon, Button, message } from 'antd';

/**
 * This corresponding to the page for medicine management
 * Page is secured by checking doctor_role in the localStorge, if not a doctor, will be directed to noPermission page
 */
class ManageMed extends Component {
  constructor(props) {
    super(props);
    const isDoctor = localStorage.getItem('doctorRole');
    this.state = {
      medList: [],
      medName: null
    };
    if (isDoctor !== 'true') {
      this.navigateToNoPermission();
    }
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

  setMedName = event => {
    this.setState({ medName: event.target.value });
  };

  handleAddMed = () => {
    if (!isEmpty(this.state.medName)) {
      this.setState({ medName: null });
      this.props.addMed(this.state.medName);
    } else {
      message.error('Med Name Cannot Be Empty');
    }
  };

  deleteMed = medId => {
    this.setState({ medName: null });
    this.props.deleteMed(medId);
  };

  render() {
    return (
      <div className="form-wrapper">
        <List
          header={<div style={{ fontWeight: 'bold' }}>Current Medicines</div>}
          bordered
          dataSource={this.state.medList}
          renderItem={item => (
            <List.Item>
              {item.name}
              <Icon type="delete" className="delete-med-icon" onClick={this.deleteMed.bind(this, item._id)} />
            </List.Item>
          )}
        />
        <Divider />
        <h3>Add New</h3>
        <Input
          prefix={<Icon type="plus-circle" style={{ color: 'rgba(0,0,0,.25)', fontSize: 16, marginLeft: -5 }} />}
          placeholder="New Med Name"
          onInput={this.setMedName}
          value={this.state.medName}
        />
        <Button type="primary" onClick={this.handleAddMed}>
          Add New Med
        </Button>
      </div>
    );
  }
}

ManageMed.propTypes = {
  deleteMed: PropTypes.func,
  addMed: PropTypes.func,
  listMed: PropTypes.func,
  changePage: PropTypes.func
};

const mapStateToProps = state => {
  return {
    nextPage: state.credential.nextPage,
    medList: state.doctor.medList
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      listMed,
      addMed,
      deleteMed,
      changePage: (route, payload) => push(route, payload)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageMed);
