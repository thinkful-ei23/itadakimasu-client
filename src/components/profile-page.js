import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';

import { fetchProgress } from '../actions/question';
import './profile-page.css'


export class Profile extends React.Component {

	componentDidMount() {
		this.props.dispatch(fetchProgress())
	}

	calculateAllSucceses() {
		const allSuccesses = this.props.userData.reduce((acc, question) => {
			return acc + question.successes;
		}, 0);
		return allSuccesses;
	}

	calculateAllQuestionsAsked() {
		const allQuestionsAsked = this.props.userData.reduce((acc, question) => {
			return acc + question.attempts;
		}, 0);
		return allQuestionsAsked;
	}

	render() {

		if (!this.props.userData) {
			return (
				<div className="loadPage">
					<img src="/img/gude_loading.png" alt="gudetama resting while the page is loading" />
				</div>
			);
		} else {
			let allSuccessses = 0;
			allSuccessses = this.calculateAllSucceses();
			let allQuestionsAsked = 0;
			allQuestionsAsked = this.calculateAllQuestionsAsked();

			const userData = this.props.userData.map(question => (
				<tr key={question.index}>
					<th>Question: {question.question}</th>
					<td> {question.successes} correct out of {question.attempts}</td>
				</tr>
			));
			console.log(this.props.u)

			return (
				<main role="main" className="profile">
					<div className="profile-padding">
						<h2>Your Profile</h2>
						<h3>UserName: {this.props.user.username}</h3>

						<div className="top-progress">
							<h3>Today's Progress</h3>
							<p className="results">{this.props.sessionCorrect}&nbsp;&nbsp;correct out of&nbsp;&nbsp;{this.props.sessionQuestionsAsked}</p>
						</div>
						<div className="top-progress">
							<h3>Overall Progress</h3>
							<p className="results">{allSuccessses}&nbsp;&nbsp;correct out of&nbsp;&nbsp;{allQuestionsAsked}</p>
						</div>
					</div>

					<div className="question-chart">
						<h4>Question Progress</h4>
						<table>
							{userData}
						</table>
					</div>
					<div className="btn-bottom">
						<button className="btn-profile" >
							<Link to="/dashboard" className="btn-link">back to the game</Link>
						</button>
					</div>
				</main>

			)
		}
	}
}

const mapStateToProps = state => ({
	user: state.auth.currentUser,
	userData: state.question.userData,
	sessionQuestionsAsked: state.question.questionsAsked,
	sessionCorrect: state.question.correct
});
export default requiresLogin()(connect(mapStateToProps)(Profile));