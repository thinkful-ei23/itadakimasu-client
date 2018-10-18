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

	render() {

		if (!this.props.userData) {
			return (
				<div>
					<img src="/img/gude_loading.png" alt="gudetama resting" />
				</div>
			);
		} else {
			const userData = this.props.userData.map(question => (
				<li key={question.index}>
					<h3>Question {question.index}</h3>
					<p>Answer is {question.answer} </p>
					<p>{question.successes}&nbsp;&nbsp;out of&nbsp;&nbsp;{question.attempts}</p>
				</li>
			));

			return (
				<section className="profile">
					<div>
						<h2>Your Profile</h2>
						<h3>UserName{this.props.username}</h3>
						<h3>Today's Progress</h3>
						<p className="results">{this.state.correct}&nbsp;&nbsp;correct out of&nbsp;&nbsp;{this.state.questionsAsked}</p>

						<h3>Overall Progress</h3>
						<p className="results">{this.state.AllCorrect}&nbsp;&nbsp;correct out of&nbsp;&nbsp;{this.state.AllQuestionsAsked}</p>
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
	userData: state.question.userData
});
export default requiresLogin()(connect(mapStateToProps)(Profile));