import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion } from '../actions/question'

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
    this.setState({message: ''});
    this.setState({submitted: false});
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

    if (answer.toLowerCase() === this.props.currentQuestion.answer) {
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
        <div>
            <button onClick={() => this.getNextQuestion()} className="next">Next</button>
        </div>;
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
            <form onSubmit={(e) => this.submitAnswer(e)}>
                <div>
                    <input id="input-Answer "
                    className="input-Answer"
                    type="text"
                    ref={input => this.textInput = input}
                    />
                </div>
                <div>
                    <button 
                    className="submit"
                    >Submit</button>
                </div>
            </form>

          <div>
            <p>{this.state.message}</p>
          </div>

          <div>
            <p># {number} correct out of all {answers}</p>
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