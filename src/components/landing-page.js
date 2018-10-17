import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './landing.css';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <p className="intro">Do you know what to order in a Japanese restaurant?  Itadakimasu! will help you learn the names of different dishes. Try it out. I needed more text to see how it would work out with the image. maybe I should try other images on other pages.</p>
            <div className="btn-row">
                <Link to="/login" className="btn-land btn-landL">LogIn</Link>
                <Link to="/register" className="btn-land">Register</Link>
                <div className="corner-pic" id="corner-pic"><img url="/img/resting.png" alt='Gudetama Resting'/></div>


        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(LandingPage);
