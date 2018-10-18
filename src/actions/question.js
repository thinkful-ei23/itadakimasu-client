import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_QUESTION_REQUEST = 'FETCH_QUESTION_REQUEST';
export const fetchQuestionRequest = () => ({
	type: FETCH_QUESTION_REQUEST
});

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = question => ({
	type: FETCH_QUESTION_SUCCESS,
	question
});

export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';
export const fetchQuestionError = error => ({
	type: FETCH_QUESTION_ERROR,
	error
});

export const fetchQuestion = () => (dispatch, getState) => {
	dispatch(fetchQuestionRequest());
	const authToken = getState().auth.authToken;

	fetch(`${API_BASE_URL}/question`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
		})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then((question) => dispatch(fetchQuestionSuccess(question)))
		.catch(err => {
			dispatch(fetchQuestionError(err));
		});
};

export const POST_RESULT_REQUEST = 'POST_RESULT_REQUEST';
export const postResultRequest = () => ({
	type: POST_RESULT_REQUEST
});

export const POST_RESULT_SUCCESS = 'POST_RESULT_REQUEST';
export const postResultSuccess = () => ({
  type: POST_RESULT_SUCCESS
});

export const POST_RESULT_ERROR = 'POST_RESULT_ERROR';
export const postResultError = (error) => ({
  type: POST_RESULT_ERROR,
  error
});

export const postResult = (result) => (dispatch, getState) => {
  dispatch(postResultRequest());
  const authToken = getState().auth.authToken;

  fetch(`${API_BASE_URL}/question`, {
    method: 'POST',
    body: JSON.stringify(result),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(() => {
    dispatch(postResultSuccess());
  })
  .catch(err => {
    dispatch(postResultError(err));
  });
};

export const FETCH_PROGRESS_REQUEST = 'FETCH_PROGRESS_REQUEST';
export const fetchProgressRequest = () => ({
  type: FETCH_PROGRESS_REQUEST
});

export const FETCH_PROGRESS_SUCCESS = 'FETCH_PROGRESS_SUCCESS';
export const fetchProgressSuccess = (questions) => ({
  type: FETCH_PROGRESS_SUCCESS,
  questions
});

export const FETCH_PROGRESS_ERROR = 'FETCH_PROGRESS_ERROR';
export const fetchProgressError = (error) => ({
  type: FETCH_PROGRESS_ERROR,
  error
});

export const fetchProgress = () => (dispatch, getState) => {
  dispatch(fetchProgressRequest());
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/progress`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(questions => {
    dispatch(fetchProgressSuccess(questions))
  })
  .catch(err => {
    dispatch(fetchProgressError(err));
  });
};




