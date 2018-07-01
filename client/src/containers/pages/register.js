import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form, Icon, Input, Button, message, Divider } from 'antd';
import { register } from '../../action/credential';
import { clearLocalStorage } from '../../model/utils';
import text from '../../const/text';
import PropTypes from 'prop-types';
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
          {text.register}
        </Divider>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={text.username} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder={text.password}
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
              placeholder={text.confirmPassword}
            />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            {text.register}
          </Button>
          <Button
            type="default"
            style={{ marginTop: 10 }}
            className="login-form-button"
            onClick={() => this.props.changePage('/login')}>
            {text.cancel}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

NormalRegisterForm.propTypes = {
  form: PropTypes.object,
  register: PropTypes.func,
  changePage: PropTypes.func
};

const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);

class Register extends React.Component {
  success = content => {
    message.success(content, 2);
  };

  error = content => {
    message.error(content, 2);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { errorMessage } = nextProps;
    if (errorMessage) {
      this.error(errorMessage);
    } else {
      clearLocalStorage();
      this.success('User created, please login');
      this.props.changePage();
    }
  }

  render() {
    return (
      <WrappedNormalRegisterForm
        className="form-wrapper"
        register={this.props.register}
        changePage={this.props.changePage}
      />
    );
  }
}

Register.propTypes = {
  changePage: PropTypes.func,
  register: PropTypes.func
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
      register,
      changePage: payload => push('/', payload)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
