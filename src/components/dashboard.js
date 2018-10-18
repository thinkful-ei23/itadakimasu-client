import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion, postResult, incrementQuestions, incrementCorrect } from '../actions/question';
import './dashboard.css';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      message: ''
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchQuestion());
  }

  clearValues() {
    this.setState({ message: '' });
    this.setState({ submitted: false });
    this.textInput.value = '';
  }

  getNextQuestion() {
    this.props.dispatch(fetchQuestion());
    this.clearValues();
  }

  submitAnswer(e) {
    e.preventDefault();
    console.log('submitAnswer ran!');
    const answer = this.textInput.value;
    this.setState({
      submitted: true
    });

    let resQuestion

    if (answer.toLowerCase() === this.props.currentQuestion.answer) {
      const message = 'You`re correct!';
      this.setState({
        message
      });
      this.props.dispatch(incrementQuestions());
      this.props.dispatch(incrementCorrect());

      resQuestion = Object.assign({}, this.props.currentQuestion, {
        memoryStr: this.props.currentQuestion.memoryStr * 2,
        attempts: this.props.currentQuestion.attempts + 1,
        successes: this.props.currentQuestion.successes + 1
      });
    }

    else {
      const message = `Sorry, the correct answer is ${this.props.currentQuestion.answer}`;
      this.setState({
        message
      });
      this.props.dispatch(incrementQuestions());

      resQuestion = Object.assign({}, this.props.currentQuestion, {
        memoryStr: 1,
        attempts: this.props.currentQuestion.attempts + 1
      });
    }
    this.props.dispatch(postResult(resQuestion));
  }

  render() {
    let nextButton;

    if (!this.props.currentQuestion) {
      return (
        <div className="loadPage" >
          <img src="/img/gude_loading.png" alt="gudetama resting while the page is loading" />
        </div>
      );
    }
    console.log(this.state.submitted);
    if (this.state.submitted) {
      nextButton =
        <div className="dash">
          <button className="btn-dash" onClick={() => this.getNextQuestion()}>Next</button>
        </div>;
    }

    return (
      <section className="dashboard">
        <div className="dashboard-username">
          Hello, {this.props.username}
        </div>

        <section className="dash-input">
          <div className="dash dash-pic">

            <img className="image" src={this.props.currentQuestion.imageURL} alt="this drawing" />
            <p className="character">{this.props.currentQuestion.question}</p>
          </div>
          <form onSubmit={(e) => this.submitAnswer(e)}>

            <div className="dash-answer">
              <label className="label">Type the answer below</label>
              <input id="input-Answer "
                className="input-Answer"
                type="text"
                ref={input => this.textInput = input}
              />
            </div>
            <div className="dash">
              <button
                className="btn-dash"
              >Submit</button>
            </div>
          </form>

          <div className="dash">
            <p className="results">{this.state.message}</p>
          </div>

          <div className="dash">
            <p className="results">{this.props.correct}&nbsp;&nbsp;correct out of&nbsp;&nbsp;{this.props.questionsAsked}</p>
          </div>

          {nextButton}
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
    currentQuestion: state.question.currentQuestion,
    questionsAsked: state.question.questionsAsked,
    correct: state.question.correct
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

