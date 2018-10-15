import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <p>Do you know what to order in a Japanese restaurant?  Itadakimasu! will help you learn the names of different dishes. Try it out.</p>
            <Link to="/login">LogIn</Link>
            <Link to="/register">Register</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
