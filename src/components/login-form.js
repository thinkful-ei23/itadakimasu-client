import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { login } from '../actions/auth';
import { required, nonEmpty } from '../validators';
import './login-form.css';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
                <form className="login-reg"
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    {error}
                    <label htmlFor="username" className="label-login">Username</label>
                    <Field
                        className="field-login"
                        component={Input}
                        type="text"
                        name="username"
                        id="username"
                        validate={[required, nonEmpty]}
                        class="label-login"
                        label="Username"
                    />
                    <label htmlFor="password" className="label-login">Password</label>
                    <Field
                        className="field-login"
                        component={Input}
                        type="password"
                        name="password"
                        id="password"
                        validate={[required, nonEmpty]}
                        class="label-login"
                        label="Password"
                    />
                    <div className="btn-div">
                        <button className="btn-sub" disabled={this.props.pristine || this.props.submitting}>
                            Log in
                        </button>
                    </div>
                </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
