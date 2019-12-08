"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unauthorizedUser = void 0;

var unauthorizedUser = function unauthorizedUser(res) {
  return res.status(401).json({
    success: false,
    message: "unauthorized user"
  });
};

exports.unauthorizedUser = unauthorizedUser;