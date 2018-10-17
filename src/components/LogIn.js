import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from './login-form';
import './Login.css';

export function LogIn(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home-login">
            <h2>Log in to Itadakimasu</h2>
            <LoginForm />
            <p className="reg_link">Don't have an account? Register <Link to="/register">here</Link></p>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LogIn);
