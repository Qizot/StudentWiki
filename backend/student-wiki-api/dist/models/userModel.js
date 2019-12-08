"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateEmail = function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var userSchema = new _mongoose["default"].Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: [validateEmail, "email must match standard"],
    index: {
      unique: true,
      collation: {
        locale: 'en',
        strength: 2
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [{
      type: String,
      "enum": ["user", "admin"]
    }],
    "default": ["user"]
  }
});

userSchema.methods.getSecureUser = function () {
  return {
    id: this._id.toString(),
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    roles: this.roles
  };
};

var User = _mongoose["default"].model('User', userSchema);

var _default = User;
exports["default"] = _default;