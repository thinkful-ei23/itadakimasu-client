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
        loggedOutMessage = <p className="textCentered" style={pStyle}>You have successfully logged out</p>;
        setTimeout(() => props.dispatch(clearLoggedOut()), 4000);
    }

    return (
        <main role="main">
            <div className="home">
                {loggedOutMessage}
                <p className="intro"><h3>Food is the most important part of travel.</h3> <br /><br /> Why is that? Preparing and ordering food at home is routine. It's expected. But hop on a plane, and suddenly, acquiring food is a challenge. If you don't know the magic words, you're out of luck. You resort to pointing wildly at the menu, unaware of what dish will reach your table. <br /><br /> If you're planning a trip to Japan, or want to learn Japanese, Itadakimasu will help you learn the names of common Japanese dishes. Impress friends, waiters, and friends-who-are-also-waiters with your knowledge. Good luck, gourmand.</p>
                <div className="btn-row">
                    <Link to="/login" className="btn-land btn-landL">Login</Link>
                    <Link to="/register" className="btn-land">Register</Link>
                </div>
                <div className="corner-pic" id="corner-pic"><img src="/img/resting.png" alt='Gudetama Resting' /></div>
            </div >
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    loggedOut: state.auth.loggedOut
});


export default connect(mapStateToProps)(LandingPage);
