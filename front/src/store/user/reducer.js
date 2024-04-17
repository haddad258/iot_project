// userReducers.js

// Action types
export const SET_USER_INFO = 'SET_USER_INFO';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

// Initial state
const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}, // Load from local storage if available
};

// Reducer function
const userReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER_INFO:
      newState = setUserInfo(state, action.payload);
      break;
    case UPDATE_USER_INFO:
      newState = updateUserInfo(state, action.payload);
      break;
    case CLEAR_USER_INFO:
      newState = clearUserInfo();
      break;
    default:
      newState = state;
  }
  
  // Update local storage
  localStorage.setItem('userInfo', JSON.stringify(newState.userInfo));

  return newState;
};

// Action creators
export const setUserInfoAction = (userInfo) => ({
  type: SET_USER_INFO,
  payload: { userInfo },
});

export const updateUserInfoAction = (updatedInfo) => ({
  type: UPDATE_USER_INFO,
  payload: { updatedInfo },
});

export const clearUserInfoAction = () => ({
  type: CLEAR_USER_INFO,
});

// Helper functions
const setUserInfo = (state, payload) => {
  const { userInfo } = payload;
  return { ...state, userInfo: userInfo };
};

const updateUserInfo = (state, payload) => {
  const { updatedInfo } = payload;
  return { ...state, userInfo: { ...state.userInfo, ...updatedInfo } };
};

const clearUserInfo = () => {
  return { ...initialState }; // Reset to initial state
};

export default userReducer;
