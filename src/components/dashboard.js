import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion } from '../actions/question'

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestion());
  }
  render() {
    let number = this.props.number;
    let answers = this.props.answers;
    if (!this.props.currentQuestion) {
      return (
        <div>
          <img src="/img/gude_loading.png" alt="gudetama resting" />
        </div>
      );
    }
    return (
      <section className="dashboard">
        <div className="dashboard-username">
          Hello, {this.props.username}
        </div>

        <section classsName="dash-input">
          <div className="dash-pic">
            <img className="image" src={this.props.currentQuestion.imageURL} alt="this drawing" />
            <p>{this.props.currentQuestion.question}</p>
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
            <p># {number} correct out of all {answers}</p>
          </div>

          <div>
            <button className="next">Next</button>
          </div>
        </section >
      </section >
    );
  }
}
const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    currentQuestion: state.question.currentQuestion
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));