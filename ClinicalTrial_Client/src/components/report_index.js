import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTime } from '../actions';

class ReportIndex extends Component {
    renderField(field) {
        // = field.meta.touched and field.meta.error
        const { meta : { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className="report-box">
                <div className={className}>
                    <label>{field.label}</label>
                    <input
                        className="form-control"
                        type="text"
                        {...field.input}
                    />
                    <div className="text-help">
                        {touched ? error: ''}
                    </div>
                </div>
            </div>
        )
    }

    onSubmit(values) {
        let pac = values
        pac.time = new Date().toLocaleTimeString()
        this.props.addTime(pac, () => {
            // do things with the callback
            this.props.history.push('/confirm');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="ID"
                    name="bangou"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if(!values.bangou) {
        errors.bangou = "No ID!"
    }

    // empty errors if no errors
    return errors;
}

export default reduxForm({
    // key and value same, so just need 1 validate
    validate,
    form: 'Report'
})(
    connect(null, { addTime })(ReportIndex)
);