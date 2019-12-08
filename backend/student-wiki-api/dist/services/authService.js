"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRequestAuthorized = exports.registerUser = exports.loginUser = void 0;

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loginUser = function loginUser(res, _ref) {
  var email = _ref.email,
      password = _ref.password;

  _userModel["default"].findOne({
    email: email
  }, function (err, user) {
    if (err || !user) {
      return res.status(404).json({
        success: false,
        message: "account has not been found"
      });
    }

    if (!_bcrypt["default"].compareSync(password, user.password)) {
      return res.status(401).json({
        success: false,
        message: "invalid password"
      });
    }

    var secureUser = user.getSecureUser();
    return res.status(200).json({
      success: true,
      message: "successfully loged in",
      token: (0, _helpers.createToken)(secureUser)
    });
  });
};

exports.loginUser = loginUser;

var registerUser = function registerUser(res, _ref2) {
  var email = _ref2.email,
      firstname = _ref2.firstname,
      lastname = _ref2.lastname,
      password = _ref2.password;

  var hash = _bcrypt["default"].hashSync(password, 10);

  _userModel["default"].create({
    email: email,
    firstname: firstname,
    lastname: lastname,
    password: hash
  }).then(function (user) {
    return res.status(200).json({
      success: true,
      message: "account has been created"
    });
  })["catch"](function (err) {
    var errMsg = err.code === 11000 ? "email is not unique" : "failed to create account";
    return res.status(400).json({
      success: false,
      message: errMsg
    });
  });
};

exports.registerUser = registerUser;

var isRequestAuthorized = function isRequestAuthorized(req, role) {
  return req && req.user && req.user.roles && req.user.roles.includes(role);
};

exports.isRequestAuthorized = isRequestAuthorized;