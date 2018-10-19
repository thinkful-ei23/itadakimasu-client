import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';

import './registration-form.css';



const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const { username, password, firstName, lastName } = values;
        const user = { username, password, firstName, lastName };
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <form
                className="login-reg"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="firstName" className="label-login">First name</label>
                <Field component={Input} type="text" name="firstName" label="First name"
                    class="label-login"/>
                <label htmlFor="lastName" className="label-login">Last name</label>
                <Field component={Input} type="text" name="lastName" label="Last name"
                    class="label-login" />
                <label htmlFor="username" className="label-login">Username</label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    validate={[required, nonEmpty, isTrimmed]}
                    label="Username"
                    class="label-login"
                />
                <label htmlFor="password" className="label-login">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                    label="Password"
                    class="label-login"
                />
                <label htmlFor="passwordConfirm" className="label-login">Confirm password</label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                    label="Confirm password"
                    class="label-login"
                />
                <div className="btn-div">
                    <button
                        className="btn-sub"
                        type="submit"
                        disabled={this.props.pristine || this.props.submitting}>
                        Register
                </button>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
