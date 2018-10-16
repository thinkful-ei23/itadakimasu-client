import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion } from '../actions/question'

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestion());
  }

  constructor(props) {
        super(props);
        this.state = {
            answer: '',
            submitted: false,
            message: ''
        }
    }

  setAnswer(e) {
    console.log(e.target.value);
    const answer = e.target.value.toLowerCase();
    this.setState({
      answer
    });
  }

  submitAnswer() {
    console.log('submitAnswer ran!');
    const answer = this.state.answer;
    this.setState({
      submitted: true
    });

    if (answer === this.props.currentQuestion.answer) {
      const message = 'You`re correct!';
      this.setState({
        message
      });
    }

    else {
      const message = `Sorry, the correct answer is ${this.props.currentQuestion.answer}`;
      this.setState({
        message
      });
    }
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

        <section className="dash-input">
          <div className="dash-pic">
            <img className="image" src={this.props.currentQuestion.imageURL} alt="this drawing" />
            <p>{this.props.currentQuestion.question}</p>
          </div>

          <div>
            <input id="input-Answer "
              className="input-Answer"
              type="text"
              onChange={(e) => this.setAnswer(e)}
              />
          </div>

          <div>
            <button 
              className="submit"
              onClick={() => this.submitAnswer()}
              >Submit</button>
          </div>

          <div>
            <p>{this.state.message}</p>
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