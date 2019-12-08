"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _userModel = _interopRequireDefault(require("./models/userModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = process.env.PORT || 3000;
var host = process.env.HOST || "localhost";
var mongoHost = process.env.MONGO || "localhost";

_mongoose["default"].set('useCreateIndex', true);

_mongoose["default"].connect("mongodb://".concat(mongoHost, "/student_wiki"), {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = _mongoose["default"].connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected with mongodb database instance: ".concat(mongoHost));
});

_userModel["default"].findOne({
  email: "admin@gmail.com"
}).then(function (admin) {
  if (!admin) {
    _userModel["default"].create({
      firstname: "admin",
      lastname: "admin",
      email: "admin@gmail.com",
      password: _bcrypt["default"].hashSync("admin", 10),
      roles: ["user", "admin"]
    });
  }
})["catch"](function (err) {
  console.log(err);
});

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
app.use('/api', _index["default"]);
app.listen(port, host, function (e) {
  if (e) {
    throw new Error('Internal Server Error');
  }

  console.log("Server is running on ".concat(host, ":").concat(port));
});
var _default = app;
exports["default"] = _default;