"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.logout = exports.signup = exports.restoreUser = exports.login = void 0;

var _csrf = require("./csrf");

var SET_SESSION_USER = 'SET_SESSION_USER';
var REMOVE_SESSION_USER = 'REMOVE_SESSION_USER';

var setSessionUser = function setSessionUser(user) {
  return {
    type: SET_SESSION_USER,
    user: user
  };
};

var removeSessionUser = function removeSessionUser() {
  return {
    type: REMOVE_SESSION_USER,
    user: null
  };
};

var login = function login(user) {
  return function _callee(dispatch) {
    var credential, password, res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            credential = user.credential, password = user.password;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _csrf.fetch)('/api/session', {
              method: 'POST',
              body: JSON.stringify({
                credential: credential,
                password: password
              })
            }));

          case 3:
            res = _context.sent;
            dispatch(setSessionUser(res.data.user));
            return _context.abrupt("return", res);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.login = login;

var restoreUser = function restoreUser() {
  return function _callee2(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap((0, _csrf.fetch)('/api/session'));

          case 2:
            res = _context2.sent;
            dispatch(setSessionUser(res.data.user));
            return _context2.abrupt("return", res);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.restoreUser = restoreUser;

var signup = function signup(user) {
  return function _callee3(dispatch) {
    var first_name, email, zip, password, res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            first_name = user.first_name, email = user.email, zip = user.zip, password = user.password;
            _context3.next = 3;
            return regeneratorRuntime.awrap((0, _csrf.fetch)('/api/users', {
              method: 'POST',
              body: JSON.stringify({
                first_name: first_name,
                email: email,
                zip: zip,
                password: password
              })
            }));

          case 3:
            res = _context3.sent;
            dispatch(setSessionUser(res.data.user));
            _context3.next = 7;
            return regeneratorRuntime.awrap((0, _csrf.fetch)('/api/shelves/new-user', {
              method: 'POST',
              body: JSON.stringify({
                user_id: res.data.user.id
              })
            }));

          case 7:
            return _context3.abrupt("return", res);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.signup = signup;

var logout = function logout() {
  return function _callee4(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("Logout function");
            _context4.next = 3;
            return regeneratorRuntime.awrap((0, _csrf.fetch)('/api/session', {
              method: 'DELETE'
            }));

          case 3:
            res = _context4.sent;
            dispatch(removeSessionUser());
            return _context4.abrupt("return", res);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
};

exports.logout = logout;
var initialState = {
  user: null
};

var sessionReducer = function sessionReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var newState;

  switch (action.type) {
    case SET_SESSION_USER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;

    case REMOVE_SESSION_USER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;

    default:
      return state;
  }
};

var _default = sessionReducer;
exports["default"] = _default;