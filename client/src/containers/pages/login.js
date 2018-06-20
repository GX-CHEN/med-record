import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../action/credential';
import { Form, Icon, Input, Button, Divider, message } from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.userName, values.password);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { changePage } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Divider className="divider-title centered">Login</Divider>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a onClick={() => changePage('/register')}>register now!</a>
        </FormItem>
      </Form>
    );
  }
}

NormalLoginForm.propTypes = {
  form: PropTypes.object,
  changePage: PropTypes.func,
  login: PropTypes.func
};

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class Login extends React.Component {
  failure = content => {
    message.error(content, 3);
  };

  componentDidMount() {
    const userId = localStorage.getItem('userId');
    const doctorRole = localStorage.getItem('doctorRole');
    if (userId) {
      this.props.changePage(String(doctorRole) === 'true' ? '/doctorDashboard' : '/reportTakeMed', { userId });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { userId, doctorRole, errorMessage } = nextProps;
    if (errorMessage) {
      this.failure(errorMessage);
    } else {
      localStorage.setItem('userId', userId);
      localStorage.setItem('doctorRole', doctorRole);
      this.props.changePage(String(doctorRole) === 'true' ? '/doctorDashboard' : '/reportTakeMed', { userId });
    }
  }

  render() {
    const { changePage } = this.props;
    return <WrappedNormalLoginForm changePage={changePage} login={this.props.login} />;
  }
}

Login.propTypes = {
  location: PropTypes.object,
  changePage: PropTypes.func,
  login: PropTypes.func
};

const mapStateToProps = state => {
  return {
    userId: state.credential.userId,
    doctorRole: state.credential.doctorRole,
    errorMessage: state.credential.errorMessage
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      changePage: (route, params) => push(route, params)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
