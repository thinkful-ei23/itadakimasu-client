import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './landing.css';
import { clearLoggedOut } from '../actions/auth';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    let loggedOutMessage;
    if (props.loggedOut) {
        const pStyle = { fontSize: 20 }
        loggedOutMessage = <p style={pStyle}>You have successfully logged out</p>;
        setTimeout(() => props.dispatch(clearLoggedOut()), 4000);
    }

    return (
        <main role="main">
            <div className="home">
                <p className="intro">Planning a trip to Japan? Itadakimasu is a quiz application that uses spaced repetition to teach you the names of common Japanese dishes. Start learning by signing up.</p>
                <div className="btn-row">
                    <Link to="/login" className="btn-land btn-landL">Login</Link>
                    <Link to="/register" className="btn-land">Register</Link>
                </div>
                <div className="corner-pic" id="corner-pic"><img src="/img/resting.png" alt='Gudetama Resting' /></div>
                {loggedOutMessage}
            </div >
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    loggedOut: state.auth.loggedOut
});


export default connect(mapStateToProps)(LandingPage);
