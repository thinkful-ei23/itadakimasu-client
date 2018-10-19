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
        <main role="main">
            <div className="home-login">
                <h2 className="home-login-title">Log in</h2>
                <LoginForm />
                <p className="reg_link">Don't have an account? Go to <Link to="/register">registration page</Link></p>
            </div>
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LogIn);
