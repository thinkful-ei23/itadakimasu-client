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
    this.props.dispatch(fetchQuestion())
    document.getElementById('game-submit').disabled = false;
    this.clearValues();
  }

  submitAnswer(e) {
    e.preventDefault();
    document.getElementById('game-submit').disabled = true;
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
        <div >
          <button className="btn-dash" onClick={() => this.getNextQuestion()}>Next</button>
        </div>;
    }
    return (
      <main className="dashboard">
        <div className="dashboard-username">
          Hello, {this.props.username}
        </div>
        <section className="dash-input">
          <div className="dash-pic">

            <img className="image" src={this.props.currentQuestion.imageURL} alt={this.props.currentQuestion.imageDescription} />
            <p className="character">{this.props.currentQuestion.question}</p>
          </div>

          <div className="dash-answer">
            <form className="dash-answer" onSubmit={(e) => this.submitAnswer(e)}>

              <label htmlFor="input-Answer" className="label">Type the answer below</label>
              <input id="input-Answer"
                className="input-Answer"
                type="text"
                ref={input => this.textInput = input} />
              <button id="game-submit"
                className="btn-dash"
              >Submit</button>
              <div className="hidden" >
                <p className="results">{this.state.message}</p>
                <p className="results">{this.props.correct}&nbsp;&nbsp;correct out of&nbsp;&nbsp;{this.props.questionsAsked}</p>
                {nextButton}
              </div>
            </form>
          </div>
        </section >
      </main >
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

