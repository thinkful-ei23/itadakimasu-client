import {
	FETCH_QUESTION_REQUEST,
	FETCH_QUESTION_SUCCESS,
	FETCH_QUESTION_ERROR,
	POST_RESULT_REQUEST,
  POST_RESULT_SUCCESS,
  POST_RESULT_ERROR,
  FETCH_PROGRESS_REQUEST,
  FETCH_PROGRESS_ERROR,
  FETCH_PROGRESS_SUCCESS,
  INCREMENT_CORRECT,
  INCREMENT_QUESTIONS
} from '../actions/question';

const initialState = {
  currentQuestion: null,
  userData: null,
	loading: false,
  error: null,
  questionsAsked: 0,
  correct: 0
};

export default function reducer(state = initialState, action) {
	if (action.type === FETCH_QUESTION_REQUEST) {
		return Object.assign({}, state, {
			loading: true,
		});
	}
	else if (action.type === FETCH_QUESTION_SUCCESS) {
		return Object.assign({}, state, {
			currentQuestion: action.question,
			loading: false,
		});
	}
	else if (action.type === FETCH_QUESTION_ERROR) {
		return Object.assign({}, state, {
			error: action.error,
			loading: false,
		});
	}

	else if (action.type === POST_RESULT_REQUEST) {
		return Object.assign({}, state, {
			loading: true
    });
  }
  
  else if (action.type === POST_RESULT_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    })
  }
  
  else if (action.type === POST_RESULT_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }

  else if (action.type === FETCH_PROGRESS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }

  else if (action.type === FETCH_PROGRESS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      userData: action.questions
    });
  }

  else if (action.type === FETCH_PROGRESS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if (action.type === INCREMENT_CORRECT) {
    let newCount = state.correct + 1;
    return {...state, correct: newCount};
  }
  else if (action.type === INCREMENT_QUESTIONS) {
    let newCount = state.questionsAsked + 1;
    return {...state, questionsAsked: newCount};
  }
  
	return state;
}

