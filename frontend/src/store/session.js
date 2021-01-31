import { fetch } from './csrf';


const SET_SESSION_USER = "SET_SESSION_USER";
const REMOVE_SESSION_USER = "REMOVE_SESSION_USER";


const setSessionUser = (user) => {
    return {
        type: SET_SESSION_USER,
        user
    };
};

const removeSessionUser = () => {
    return {
        type: REMOVE_SESSION_USER,
        user: null
    };
};


export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const res = await fetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        credential,
        password,
      }),
    });
    dispatch(setSessionUser(res.data.user));
    return res;
};

export const restoreUser = () => async (dispatch) => {

    const res = await fetch('/api/session');
    dispatch(setSessionUser(res.data.user));
    return res;
};

export const signup = (user) => async (dispatch) => {
    const { first_name, email, zip, password } = user;
    const res = await fetch('/api/users', {
        method: "POST",
        body: JSON.stringify({
            first_name,
            email,
            zip,
            password
        })
    })
    dispatch(setSessionUser(res.data.user));
    return res;
};

export const logout = () => async (dispatch) => {
    const res = await fetch('/api/session', {
        method: 'DELETE'
    })
    dispatch(removeSessionUser())
    localStorage.clear();
    return res;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_SESSION_USER:
            newState = Object.assign({}, state)
            newState.user = action.user
            return newState
        case REMOVE_SESSION_USER:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
