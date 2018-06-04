import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form, Icon, Input, Button, message, Divider } from 'antd';
import { register } from '../../action/credential';
import { includes } from 'lodash';
const FormItem = Form.Item;

class NormalRegisterForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.register(values.userName, values.password);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
          Register
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
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: 'Please confirm your Password!' },
              { validator: this.compareToFirstPassword }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Confirm Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Register
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);

class Register extends React.Component {
  error = content => {
    message.error(content, 3);
  };

  componentWillReceiveProps(nextProps) {
    const { userId } = nextProps;
    if (userId) {
      if (includes(userId, 'already exist')) {
        this.error(userId);
      } else {
        this.props.changePage({ success: true });
      }
    }
  }

  render() {
    return <WrappedNormalRegisterForm className="form-wrapper" register={this.props.register} />;
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
      register,
      changePage: payload => push('/', payload)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Register);
