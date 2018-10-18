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
				<li key={question.index}>
					<h3>Question: {question.question}</h3>
					<p>You've got this question right {question.successes} times out of {question.attempts}</p>
				</li>
			));

			return (
				<section className="profile">
					<div>
						<h2>Your Profile</h2>
						<h3>UserName{this.props.username}</h3>
						<h3>Today's Progress</h3>
						<p className="results">{this.props.sessionCorrect}&nbsp;&nbsp;correct out of&nbsp;&nbsp;{this.props.sessionQuestionsAsked}</p>

						<h3>Overall Progress</h3>
						<p className="results">{allSuccessses}&nbsp;&nbsp;correct out of&nbsp;&nbsp;{allQuestionsAsked}</p>
					</div>
					<div className="question-chart">
						<h3>Question Progress</h3>
						<ul>
							{userData}
						</ul>
					</div>

					<button className="btn-profile" >
						<Link to="/dashboard" className="btn-profile">back to the game</Link>
					</button>

				</section>

			)
		}
	}
}

const mapStateToProps = state => ({
	userData: state.question.userData,
	sessionQuestionsAsked: state.question.questionsAsked,
	sessionCorrect: state.question.correct 
});
export default requiresLogin()(connect(mapStateToProps)(Profile));