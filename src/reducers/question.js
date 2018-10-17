import {
	FETCH_QUESTION_REQUEST,
	FETCH_QUESTION_SUCCESS,
	FETCH_QUESTION_ERROR,
	POST_RESULT_REQUEST,
  POST_RESULT_SUCCESS,
  POST_RESULT_ERROR,
} from '../actions/question';

const initialState = {
	currentQuestion: null,
	loading: false,
	error: null
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
  
	return state;
}

