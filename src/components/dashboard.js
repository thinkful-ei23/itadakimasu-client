import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion, postResult } from '../actions/question';
import './dashboard.css';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      message: '',
      questionsAsked: 0,
      correct: 0
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
      this.setState({
        questionsAsked: this.state.questionsAsked + 1
      });
      this.setState({
        correct: this.state.correct + 1
      });

      resQuestion = Object.assign({}, this.props.currentQuestion, {
        memoryStr: this.props.currentQuestion.memoryStr*2
      });
    }

    else {
      const message = `Sorry, the correct answer is ${this.props.currentQuestion.answer}`;
      this.setState({
        message
      });
      this.setState({
        questionsAsked: this.state.questionsAsked + 1
      });

      resQuestion = Object.assign({}, this.props.currentQuestion, {
        memoryStr: 1
      });
    }
    this.props.dispatch(postResult(resQuestion));
  }

  render() {
    let nextButton;

    if (!this.props.currentQuestion) {
      return (
        <div>
          <img src="/img/gude_loading.png" alt="gudetama resting" />
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

        <section classsName="dash-input">
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
            <p className="results">{this.state.correct}&nbsp;&nbsp;correct out of&nbsp;&nbsp;{this.state.questionsAsked}</p>

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
    currentQuestion: state.question.currentQuestion
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

