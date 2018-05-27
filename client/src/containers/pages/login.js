import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../action/credential';
import { includes } from 'lodash';
import { Form, Icon, Input, Button, Divider, message } from 'antd';
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
        <Divider
          style={{
            fontSize: 22,
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.65)',
            fontWeight: 400,
            marginBottom: 40
          }}>
          Login
        </Divider>
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

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class Login extends React.Component {
  success = content => {
    message.success(content, 3);
  };

  failure = content => {
    message.error(content, 3);
  };

  componentDidMount() {
    const { location } = this.props;
    if (location.state && location.state.success) {
      this.success('User created, please login');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userId } = nextProps;
    if (userId) {
      if (includes(userId, 'fail')) {
        this.failure(userId);
      } else {
        localStorage.setItem('userId', userId);
        this.props.changePage('/scheduleList', { userId });
      }
    }
  }

  render() {
    const { changePage } = this.props;
    return <WrappedNormalLoginForm className="form-wrapper" changePage={changePage} login={this.props.login} />;
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
      login,
      changePage: (route, params) => push(route, params)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
