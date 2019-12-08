"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.meRoute = exports.registerRoute = exports.loginRoute = void 0;

var _authService = require("../services/authService");

var loginRoute = function loginRoute(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "both email and password must be specified"
    });
    return;
  }

  (0, _authService.loginUser)(res, {
    email: email,
    password: password
  });
};

exports.loginRoute = loginRoute;

var registerRoute = function registerRoute(req, res) {
  var params = req.body;
  var firstname = params.firstname,
      lastname = params.lastname,
      email = params.email,
      password = params.password;

  if (!firstname || !lastname || !email || !password) {
    res.status(400).json({
      success: false,
      message: "params are misssing"
    });
    return;
  }

  (0, _authService.registerUser)(res, {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password
  });
};

exports.registerRoute = registerRoute;

var meRoute = function meRoute(req, res) {
  if (!req.user) {
    return res.status(500).json({
      success: false,
      message: "user has not been found, this is server error as the middleware should catch it"
    });
  }

  return res.json(req.user);
};

exports.meRoute = meRoute;