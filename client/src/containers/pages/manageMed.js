import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { deleteMed, addMed, listMed } from '../../action/doctor';
import { logout } from '../../action/credential';
import { connect } from 'react-redux';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { List, Divider, Input, Icon, Button, message } from 'antd';
import { confirmationModal } from '../components/confirmationModal';

/**
 * This corresponding to the page for medicine management
 * Page is secured by checking doctor_role in the localStorge, if not a doctor, will be directed to noPermission page
 */
class ManageMed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      medList: [],
      medName: null
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem('userId');
    const isDoctor = localStorage.getItem('doctorRole');
    if (!userId) {
      this.props.changePage('/');
    }
    if (isDoctor !== 'true') {
      this.navigateToNoPermission();
    }
    this.props.listMed();
  }

  navigateToNoPermission = () => {
    this.props.changePage('/noPermission');
  };

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

  handleLogout = () => {
    confirmationModal({
      onOk: () => {
        localStorage.setItem('userId', '');
        localStorage.setItem('doctorRole', '');
        this.props.logout();
        this.props.changePage('/');
      }
    });
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
        <Icon type="logout" className="logout-icon" onClick={this.handleLogout} />
      </div>
    );
  }
}

ManageMed.propTypes = {
  deleteMed: PropTypes.func,
  addMed: PropTypes.func,
  listMed: PropTypes.func,
  changePage: PropTypes.func,
  logout: PropTypes.func,
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
      logout,
      changePage: (route, payload) => push(route, payload)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageMed);
