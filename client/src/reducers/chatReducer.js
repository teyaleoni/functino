const initialState = {
  messages: [],
  username: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'SIGN_IN':
      return {...state, username: action.username}
    case 'ADD_MESSAGE':
      return {...state, messages: [...state.messages, action.message]}
    default:
      return state
  }
}