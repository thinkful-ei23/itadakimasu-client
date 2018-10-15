import React from 'react';
import { connect } from 'react-redux';
// import requiresLogin from './requires-login';
import { fetchProtectedData } from '../actions/protected-data';


export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        let number = this.props.number;
        let answers = this.props.answers;
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>

                <div className="dashboard-name">Name: {this.props.name}</div>

                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>

                <section classsName="dash-input">
                    <div className="dash-pic">
                        <img className="image" src="/img/trebleBassHeart.png" alt="alternate food description" />

                    </div>
                    <div>
                        <input id="input-Answer "
                            className="input-Answer"
                            type="text" />
                    </div>
                    <div>
                        <button className="submit">Submit</button>
                    </div>
                    <div>
                        <p>Right! or Sorry, the correct answer is ...</p>
                    </div>
                    <div>
                        <p># {number} correct out of  all {answers}</p>
                    </div>
                    <div>
                        <button className="next">Next</button>
                    </div>
                </section >
            </div >
        );
    }
}
const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        // username: state.auth.currentUser.username,
        // name: `${currentUser.firstName} ${currentUser.lastName}`,
        // protectedData: state.protectedData.data
    };
};

// export default requiresLogin()(connect(mapStateToProps)(Dashboard));
export default (connect(mapStateToProps)(Dashboard));
