import React from 'react';
import { connect } from 'react-redux';
import { clearAuth, setLoggedOut } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { Link } from 'react-router-dom';
import './header-bar.css';
import { clearSessionData } from '../actions/question';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        this.props.dispatch(setLoggedOut());
        this.props.dispatch(clearSessionData());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        let profileLink;
        const inlineBlock = {display : "inline-block"}; // get rid of this later
        if (this.props.loggedIn) {
            logOutButton = (
                <button className="btn-out" onClick={() => this.logOut()}>Log out</button>
            );
            profileLink = <li style={inlineBlock}><Link to="/profile" className="link"><h2>Your profile!</h2></Link></li>;
        }
        // inside nav should be ul, li's - don't want to mess up the css
        return (
            <nav role="navigation">
                <div className="header-bar">
                    <ul>
                        <li style={inlineBlock}><Link to="/dashboard" className="link"><h1>Itadakimasu!</h1></Link></li>
                        {profileLink}
                    </ul>
                    {logOutButton}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
