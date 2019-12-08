"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserFromToken = exports.createToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createToken = function createToken(secureUser) {
  return _jsonwebtoken["default"].sign(secureUser, _config["default"].secret, {
    expiresIn: '24h'
  });
};

exports.createToken = createToken;

var getUserFromToken = function getUserFromToken(token) {
  try {
    var user = _jsonwebtoken["default"].verify(token, _config["default"].secret);

    return user;
  } catch (err) {
    return null;
  }
};

exports.getUserFromToken = getUserFromToken;