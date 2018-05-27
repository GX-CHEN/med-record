import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { confirmationModal } from '../components/confirmationModal';
import { logout } from '../../action/credential';
const { Sider } = Layout;

class Sidebar extends React.Component {
  routeToScheduleList = () => {
    this.props.changePage('/scheduleList');
  };

  handleLogout = () => {
    confirmationModal({
      title: 'Confirm Logut',
      content: 'Are you sure to logout?',
      onOk: () => {
        this.props.logout();
        localStorage.setItem('userId', '');
        this.props.changePage('/');
      }
    });
  };

  routeToAddSchedule = () => {
    this.props.changePage('/addSchedule');
  };

  render() {
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
      >
        <div className="logo">ITS TIME</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <Icon type="layout" />
            <span className="nav-text" onClick={this.routeToScheduleList}>
              Schedule List
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="plus-circle-o" />
            <span className="nav-text" onClick={this.routeToAddSchedule}>
              Add Schedule
            </span>
          </Menu.Item>
          <Menu.Item key="3" style={{ position: 'absolute', bottom: 25 }}>
            <Icon type="poweroff" style={{ color: 'red' }} />
            <span className="nav-text" style={{ color: 'red', fontSize: 18 }} onClick={this.handleLogout}>
              Logout
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.credential.payload
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
