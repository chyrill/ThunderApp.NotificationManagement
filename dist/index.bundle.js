module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(2);

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NotificationTemplateSchema = new _mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [6, 'minimum length is 6'],
        unique: true
    },
    Description: {
        type: String
    },
    Context: {
        type: String
    },
    MessageTemplateId: {
        type: String,
        required: [true, 'Message Template Id is required']
    },
    Channel: {
        type: String,
        required: [true, 'Channel is required']
    },
    Service: {
        type: String,
        required: [true, 'Service required']
    },
    Port: {
        type: Number
    },
    Sender: {
        type: String,
        required: [true, 'Sender is required']
    },
    AccountId: {
        type: String,
        required: [true, 'AccountId is required']
    },
    AccountToken: {
        type: String,
        required: [true, 'AccountToken is required']
    },
    DateCreated: {
        type: Date,
        default: new Date()
    },
    CreatedBy: {
        type: String
    },
    DateUpdated: {
        type: Date
    },
    UpdatedBy: {
        type: String
    }
});

exports.default = _mongoose2.default.model('NotificationTemplate', NotificationTemplateSchema);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class Result {
    constructor(model, message, successful) {
        this.model = model;
        this.message = message;
        this.successful = successful;
    }
}

exports.default = Result;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(2);

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MessageTemplateSchema = new _mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        minLength: [6, 'Message template name minimum length is 6']
    },
    Context: {
        type: String
    },
    Description: {
        type: String
    },
    Subject: {
        type: String
    },
    Message: {
        type: String,
        required: [true, 'Message is required']
    },
    ContentType: {
        type: String
    },
    DateCreated: {
        type: Date,
        default: new Date()
    },
    CreatedBy: {
        type: String
    },
    DateUpdated: {
        type: Date
    },
    UpdatedBy: {
        type: String
    }
});

exports.default = _mongoose2.default.model('MessageTemplate', MessageTemplateSchema);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Authorization = Authorization;

var _axios = __webpack_require__(13);

var _axios2 = _interopRequireDefault(_axios);

var _Result = __webpack_require__(4);

var _Result2 = _interopRequireDefault(_Result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function Authorization(bearer) {
  var data = {};
  try {
    var authCode = bearer.split(" ")[1];
    await _axios2.default.post('http://localhost:3000/api/v1/userLogin/authorize', { Authorization: authCode }).then(response => {
      data = response.data;
    }).catch(err => {

      data = err.response.data;
    });
    return data;
  } catch (e) {
    console.log(e);
    result.message = e;
    result.successful = false;
    return result;
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class SearchResult {
    constructor(items, totalcount, pages, message, successful) {
        this.items = items;
        this.totalcount = totalcount;
        this.pages = pages;
        this.message = message;
        this.successful = successful;
    }
}

exports.default = SearchResult;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryFilters = QueryFilters;
function QueryFilters(filters, context) {

  var request = JSON.parse(JSON.stringify(filters));
  var result = {};

  var data = request.split(',');

  for (var i in data) {

    var propertyName = data[i].split(':')[0];
    var value = data[i].split(':')[1];
    if (value.indexOf('/') > -1) {
      var item = value.replace('/', '').replace('/', '');
      console.log(item);
      result[propertyName] = new RegExp(item, "i");
    } else {
      result[propertyName] = value;
    }
  }

  result["Context"] = context;
  console.log(result);
  return result;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(2);

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NotificationSchema = new _mongoose.Schema({
    RecipientId: {
        type: String,
        required: [true, 'Recipient is required']
    },
    Context: {
        type: String
    },
    NotificationTemplateId: {
        type: String,
        required: [true, 'Notification Template is required']
    },
    Payload: {
        type: {}
    },
    DeliveryDate: {
        type: Date
    },
    Status: {
        type: String
    },
    DateCreated: {
        type: Date,
        defualt: new Date()
    },
    CreatedBy: {
        type: String
    },
    UpdatedBy: {
        type: String
    },
    DateUpdated: {
        type: Date
    }
});

exports.default = _mongoose2.default.model('Notification', NotificationSchema);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(2);

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RecipientSchema = new _mongoose.Schema({
    UserId: {
        type: String
    },
    Name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    Context: {
        type: String
    },
    Email: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    DateCreated: {
        type: Date,
        default: new Date()
    },
    Createdby: {
        type: String
    },
    DateUpdated: {
        type: Date
    },
    UpdatedBy: {
        type: String
    }
});

exports.default = _mongoose2.default.model('Recipient', RecipientSchema);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const devConfig = {
  MONGO_URL: 'mongodb://localhost/NotificationManagement-dev'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/NotificationManagement-test'
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/NotificationManagement'
};

const defaultConfig = {
  PORT: process.env.PORT || 3005
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(2);

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const QueueSchema = new _mongoose.Schema({
    Context: {
        type: String
    },
    Email: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    NotificationTemplateId: {
        type: String
    },
    Subject: {
        type: String
    },
    Message: {
        type: String
    },
    Status: {
        type: String
    },
    DeliveryDate: {
        type: Date
    },
    Tries: {
        type: Number
    }
});

exports.default = _mongoose2.default.model('Queue', QueueSchema);

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(11);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(15);

var _middlewares = __webpack_require__(16);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _processorService = __webpack_require__(21);

var _processorService2 = _interopRequireDefault(_processorService);

var _senderService = __webpack_require__(22);

var _senderService2 = _interopRequireDefault(_senderService);

var _modules = __webpack_require__(25);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

(0, _middlewares2.default)(app);

(0, _modules2.default)(app);

app.listen(_constants2.default.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
      Server running on PORT: ${_constants2.default.PORT}
      ==================================
      Running on ${process.env.NODE_ENV}
      ==================================
      `);

    (0, _processorService2.default)();
    (0, _senderService2.default)();
  }
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(11);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

try {
  _mongoose2.default.connect(_constants2.default.MONGO_URL);
} catch (err) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL);
}

_mongoose2.default.connection.once('open', () => console.log('MongoDB running')).on('error', e => {
  throw e;
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = __webpack_require__(17);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(18);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(19);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(20);

var _helmet2 = _interopRequireDefault(_helmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
  if (isProd) {
    app.use((0, _compression2.default)());
    app.use(helmet());
  }
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));

  if (isDev) {
    app.use((0, _morgan2.default)('dev'));
  }
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ProcessorService;

var _notification = __webpack_require__(9);

var _notification2 = _interopRequireDefault(_notification);

var _messagetemplate = __webpack_require__(5);

var _messagetemplate2 = _interopRequireDefault(_messagetemplate);

var _notificationtemplate = __webpack_require__(3);

var _notificationtemplate2 = _interopRequireDefault(_notificationtemplate);

var _recipient = __webpack_require__(10);

var _recipient2 = _interopRequireDefault(_recipient);

var _queue = __webpack_require__(12);

var _queue2 = _interopRequireDefault(_queue);

var _fs = __webpack_require__(34);

var _fs2 = _interopRequireDefault(_fs);

var _createHtml = __webpack_require__(35);

var _createHtml2 = _interopRequireDefault(_createHtml);

var _unescape = __webpack_require__(36);

var _unescape2 = _interopRequireDefault(_unescape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ProcessorService() {

    console.log(`
                  =========================================
                  Processor Service Started ....  
                  =========================================
                `);

    try {
        setInterval(function () {
            Processor();
        }, 1000);
    } catch (e) {
        console.log(e);
    }
}

async function Processor() {

    var notificationItems = await _notification2.default.find({ Status: 'New' });

    for (let notification in notificationItems) {

        var item = notificationItems[notification];

        var queue = {
            Context: item.Context,
            Email: '',
            PhoneNumber: '',
            NotificationTemplateId: '',
            Subject: '',
            DeliveryDate: new Date(),
            Message: '',
            Status: 'New'
        };

        var notificationTemplateRes = await _notificationtemplate2.default.findOne({ _id: item.NotificationTemplateId });

        queue.NotificationTemplateId = notificationTemplateRes._id;

        var messageTemplateRes = await _messagetemplate2.default.findOne({ _id: notificationTemplateRes.MessageTemplateId });

        queue.Message = parseMessage(messageTemplateRes.Message, item.Payload);
        console.log((0, _unescape2.default)(queue.Message));
        queue.Subject = parseMessage(messageTemplateRes.Subject, item.Payload);

        var recipientRes = await _recipient2.default.findOne({ _id: item.RecipientId });

        if (messageTemplateRes.ContentType === 'html') {
            var html = (0, _createHtml2.default)({
                body: queue.Message
            });
            _fs2.default.writeFile('email.html', queue.Message, err => {
                if (err) {
                    console.log(err);
                }
            });
        }
        queue.Email = recipientRes.Email;
        queue.PhoneNumber = recipientRes.PhoneNumber;

        var createRes = await _queue2.default.create(queue);

        item.Status = 'Parsed';

        var updateNotif = await _notification2.default.findOneAndUpdate({ _id: item._id }, item, { Upsert: true, strict: false });
    }
}

function getListOfReplacement(message) {
    var text = message;
    var listOfPairText = [];
    var haveToReplace = true;

    do {
        var bracket = text.indexOf('{{');

        if (bracket < 0) {
            haveToReplace = false;
        } else {
            var replacementTag = text.substring(text.indexOf('{{'), text.indexOf('}}') + 2);
            listOfPairText.push(replacementTag);
            text = text.replace(replacementTag, '');
        }
    } while (haveToReplace);

    return listOfPairText;
}

function parseTable(message, payload) {
    var text = message;

    var finalTable = '';

    var hasTableToReplace = true;

    do {
        if (text.indexOf('[{Loop}]') < 0) {

            break;
        } else {

            var replacementTable = text.substring(text.indexOf('[{Loop}]'), text.indexOf('[{/Loop}]') + 9);

            var tableText = text.substring(text.indexOf('[{Loop}]') + 8, text.indexOf('[{/Loop}]'));

            var tableReplacementTags = getListOfReplacement(tableText);

            var propName = '';

            for (let item in tableReplacementTags) {
                propName = getArrayPropertyName(tableReplacementTags[item]);

                if (propName !== null || propName !== undefined) {
                    break;
                }
            }

            for (let item in payload[propName]) {
                finalTable += replaceTags(tableText, payload, tableReplacementTags, item);
            }

            text = text.replace(replacementTable, finalTable);
            finalTable = '';
        }
    } while (hasTableToReplace);
    return text;
}

function getArrayPropertyName(replacementTag) {
    if (replacementTag.indexOf('.') < 0) {
        return null;
    } else {
        return replacementTag.split('.')[0].replace('{{', '');
    }
}

function replaceTags(message, payload, replacementTags, index) {

    for (let item in replacementTags) {
        if (replacementTags[item].indexOf('.') >= 0 && index >= 0) {

            var propName = replacementTags[item].split('.')[0].replace('{{', '');
            var propValue = replacementTags[item].split('.')[1].replace('}}', '');
            var data = payload[propName][index][propValue];

            message = message.replace(replacementTags[item], data);
        } else if (replacementTags[item].indexOf('.') > 0 && index < 0) {
            var propName = replacementTags[item].split('.')[0].replace('{{', '');
            var propValue = replacementTags[item].split('.')[1].replace('}}', '');
            var data = payload[propName][propValue];

            message = message.replace(replacementTags[item], data);
        } else if (replacementTags[item].indexOf('.') < 0) {
            var data = payload[replacementTags[item].replace('{{', '').replace('}}', '')];
            message = message.replace(replacementTags[item], data);
        }
    }

    return message;
}

function parseMessage(message, payload) {
    var text = message;

    if (message.indexOf('[{Loop}]') >= 0) {
        text = parseTable(message, payload);
        var replacementTags = getListOfReplacement(text);
        text = replaceTags(text, payload, replacementTags, -1);
        return text;
    } else {
        var replacementTags = getListOfReplacement(message);
        text = replaceTags(text, payload, replacementTags, -1);
        return text;
    }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SenderService;

var _notification = __webpack_require__(9);

var _notification2 = _interopRequireDefault(_notification);

var _messagetemplate = __webpack_require__(5);

var _messagetemplate2 = _interopRequireDefault(_messagetemplate);

var _notificationtemplate = __webpack_require__(3);

var _notificationtemplate2 = _interopRequireDefault(_notificationtemplate);

var _queue = __webpack_require__(12);

var _queue2 = _interopRequireDefault(_queue);

var _nodemailerSmtpTransport = __webpack_require__(23);

var _nodemailerSmtpTransport2 = _interopRequireDefault(_nodemailerSmtpTransport);

var _emailjs = __webpack_require__(24);

var _emailjs2 = _interopRequireDefault(_emailjs);

var _unescape = __webpack_require__(36);

var _unescape2 = _interopRequireDefault(_unescape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SenderService() {
    console.log(`
==============================================
Sender Service Started ...
==============================================
`);
    try {
        setInterval(function () {
            Process();
        }, 10000);
    } catch (e) {}
}

async function Process() {
    var queueItems = await _queue2.default.find({ Status: 'New', DeliveryDate: { $lt: new Date() } });

    for (let queueIndex in queueItems) {

        var notificationTemplateRes = await _notificationtemplate2.default.findOne({ _id: queueItems[queueIndex].NotificationTemplateId });

        var messageTemplateRes = await _messagetemplate2.default.findOne({ _id: notificationTemplateRes.MessageTemplateId });

        switch (notificationTemplateRes.Channel) {
            case 'Email':
                {
                    if (notificationTemplateRes.Service.toLowerCase() === 'gmail') {

                        var item = queueItems[queueIndex];
                        var server = _emailjs2.default.server.connect({
                            user: notificationTemplateRes.AccountId,
                            password: notificationTemplateRes.AccountToken,
                            host: 'smtp.gmail.com',
                            ssl: true
                        });

                        var message = {
                            text: messageTemplateRes.ContentType === 'text' ? queueItems[queueIndex].Message : '',
                            from: notificationTemplateRes.Sender,
                            to: queueItems[queueIndex].Email,
                            subject: queueItems[queueIndex].Subject,
                            attachment: [{ data: messageTemplateRes.ContentType === 'html' ? (0, _unescape2.default)(queueItems[queueIndex].Message) : '', alternative: true }]
                        };
                        console.log(message);
                        var status = '';

                        server.send(message, (err, message) => {
                            if (err) {
                                status = 'error';
                                item['Status'] = 'Failed';
                                item['Tries'] += 1;
                            } else {
                                status = 'info';
                            }
                        });

                        if (status !== null || status !== undefined) {
                            item['Status'] = status === 'error' ? 'Failed' : 'Sent';
                            item['Tries'] += 1;
                            console.log(item);
                            await _queue2.default.findOneAndUpdate({ _id: item._id }, item, { Upsert: true, strict: false });
                        }
                    }
                    break;
                }
            default:
                break;
        }
    }
}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("nodemailer-smtp-transport");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("emailjs");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _messagetemplate = __webpack_require__(26);

var _messagetemplate2 = _interopRequireDefault(_messagetemplate);

var _notificationtemplate = __webpack_require__(28);

var _notificationtemplate2 = _interopRequireDefault(_notificationtemplate);

var _recipient = __webpack_require__(30);

var _recipient2 = _interopRequireDefault(_recipient);

var _notification = __webpack_require__(32);

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "*");
        next();
    });
    app.use('/api/v1/messagetemplate', _messagetemplate2.default);
    app.use('/api/v1/notificationtemplate', _notificationtemplate2.default);
    app.use('/api/v1/recipient', _recipient2.default);
    app.use('/api/v1/notify', _notification2.default);
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _messagetemplate = __webpack_require__(27);

var MessageTemplateController = _interopRequireWildcard(_messagetemplate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.post('', MessageTemplateController.create);
routes.get('/:id', MessageTemplateController.getById);
routes.get('/searchAll', MessageTemplateController.searchAll);
routes.get('', MessageTemplateController.search);
routes.delete('/:id', MessageTemplateController.remove);
routes.put('', MessageTemplateController.update);

exports.default = routes;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = create;
exports.searchAll = searchAll;
exports.update = update;
exports.getById = getById;
exports.remove = remove;
exports.search = search;

var _messagetemplate = __webpack_require__(5);

var _messagetemplate2 = _interopRequireDefault(_messagetemplate);

var _Authorization = __webpack_require__(6);

var _Result = __webpack_require__(4);

var _Result2 = _interopRequireDefault(_Result);

var _SearchResult = __webpack_require__(7);

var _SearchResult2 = _interopRequireDefault(_SearchResult);

var _QueryFilters = __webpack_require__(8);

var _notificationtemplate = __webpack_require__(3);

var _notificationtemplate2 = _interopRequireDefault(_notificationtemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create(req, res) {
    var result = new _Result2.default();
    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var messagetemplateRes = await _messagetemplate2.default.create(req.body);

        result.successful = true;
        result.model = messagetemplateRes;
        result.message = 'Successfully created record';

        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function searchAll(req, res) {
    var result = new _SearchResult2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var messagetemplateRes = await _messagetemplate2.default.find({ Context: req.body.Context });

        result.items = messagetemplateRes;
        result.totalcount = messagetemplateRes.length;
        result.pages = 1;
        result.message = 'Successfully retrieve records';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.items = null;
        result.totalcount = 0;
        result.pages = 0;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

async function update(req, res) {
    var result = new _Result2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.UpdatedBy = authenticationRes.model.Name;
            req.body.DateUpdated = new Date();
        }

        var messagetemplateRes = await _messagetemplate2.default.findOneAndUpdate({ _id: req.body._id }, req.body, { Upsert: true, strict: false });

        result.successful = true;
        result.model = messagetemplateRes;
        result.message = 'Successfully updated record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function getById(req, res) {
    var result = new _Result2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var id = req.params.id;

        if (id === null) {
            result.successful = false;
            result.model = null;
            result.message = 'Id must not be null';
            return res.status(400).json(result);
        }

        var messagetemplateRes = await _messagetemplate2.default.findOne({ _id: id, Context: req.body.Context });

        if (messagetemplateRes === null) {
            result.successful = false;
            result.model = null;
            result.message = 'Record not found';

            return res.status(400).json(result);
        }

        result.successful = true;
        result.model = messagetemplateRes;
        result.message = 'Successfully found record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = null;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function remove(req, res) {
    var result = new _Result2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var id = req.param.id;

        if (id === null) {
            result.successful = false;
            result.model = null;
            result.message = 'Id must not be null';

            return res.status(400).json(result);
        }

        if (await ifMessageTemplateUsed(id)) {
            result.successful = false;
            result.model = null;
            result.message = 'Message Template is currently in used';

            return res.status(400).json(result);
        }

        await _messagetemplate2.default.findOneAndRemove({ _id: id, Context: req.body.Context });

        result.successful = false;
        result.model = null;
        result.message = 'Successfully deleted record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = null;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function search(req, res) {
    var result = new _SearchResult2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.items = null;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        if (req.query.limit === null || req.query.limit === undefined) {
            req.query.limit = 20;
        }
        var filters = {};
        if (req.query.Filters != null) {
            filters = (0, _QueryFilters.QueryFilters)(req.query.Filters, req.query.Context);
        } else {
            filters["Context"] = req.query.Context;
        }

        var searchItemsRes = await _messagetemplate2.default.find(filters);

        var pages = Math.ceil(searchItemsRes.length / req.query.limit);
        var totalcount = searchItemsRes.length;

        var finalItemRes = await _messagetemplate2.default.find(filters).skip(Number(req.query.skip)).limit(Number(req.query.limit)).sort(req.query.sort);

        result.items = finalItemRes;
        result.totalcount = totalcount;
        result.pages = pages;
        result.message = 'Successfully retrieve data';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.items = null;
        result.totalcount = 0;
        result.pages = 0;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

async function ifMessageTemplateUsed(id) {
    var searchItems = await _notificationtemplate2.default.find({ MessageTemplateId: id });

    if (searchItems.length > 0) return true;

    return false;
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _notificationtemplate = __webpack_require__(29);

var NotificationTemplateController = _interopRequireWildcard(_notificationtemplate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.post('', NotificationTemplateController.create);
routes.put('', NotificationTemplateController.update);
routes.get('/:id', NotificationTemplateController.getById);
routes.get('/searchAll', NotificationTemplateController.searchAll);
routes.get('', NotificationTemplateController.search);
routes.delete('/:id', NotificationTemplateController.remove);

exports.default = routes;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = create;
exports.update = update;
exports.getById = getById;
exports.remove = remove;
exports.searchAll = searchAll;
exports.search = search;

var _notificationtemplate = __webpack_require__(3);

var _notificationtemplate2 = _interopRequireDefault(_notificationtemplate);

var _Authorization = __webpack_require__(6);

var _Result = __webpack_require__(4);

var _Result2 = _interopRequireDefault(_Result);

var _SearchResult = __webpack_require__(7);

var _SearchResult2 = _interopRequireDefault(_SearchResult);

var _QueryFilters = __webpack_require__(8);

var _messagetemplate = __webpack_require__(5);

var _messagetemplate2 = _interopRequireDefault(_messagetemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create(req, res) {
    var result = new _Result2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        if (!(await ifMessageTemplateExisted(req.body.MessageTemplateId))) {
            result.successful = false;
            result.model = req.body;
            result.message = 'Message Template does not exist';

            return res.status(400).json(result);
        }

        var createRes = await _notificationtemplate2.default.create(req.body);

        result.successful = true;
        result.model = createRes;
        result.message = 'Successfully created record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function update(req, res) {
    var result = new _Result2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.UpdatedBy = authenticationRes.model.Name;
            req.body.DateUpdated = new Date();
        }

        if (!(await ifMessageTemplateExisted(req.body.MessageTemplateId))) {
            result.successful = false;
            result.model = req.body;
            result.message = 'Message Template does not exist';

            return res.status(400).json(result);
        }

        var updateRes = await _notificationtemplate2.default.findOneAndUpdate({ _id: req.body._id }, req.body, { Upsert: true, strict: false });

        result.successful = true;
        result.model = updateRes;
        result.message = 'Successfully updated record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function getById(req, res) {
    var result = new _Result2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var id = req.params.id;

        if (id === null) {
            result.successful = false;
            result.model = null;
            result.message = 'Id is required';

            return res.status(400).json(result);
        }

        var searchItems = await _notificationtemplate2.default.findOne({ _id: id, Context: req.body.Context });

        if (searchItems === null) {
            result.successful = false;
            result.model = null;
            result.message = 'record not found';

            return res.status(400).json(result);
        }

        result.successful = true;
        result.model = searchItems;
        result.message = 'Successfully retrieve record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = null;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function remove(req, res) {
    var result = new _Result2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var id = req.params.id;

        if (id === null) {
            result.successful = false;
            result.model = null;
            result.message = 'Id is required';

            return res.status(400).json(result);
        }

        await _notificationtemplate2.default.findOneAndRemove({ _id: id });

        result.successful = true;
        result.model = null;
        result.message = 'Successfully remove record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = null;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function searchAll(req, res) {
    var result = new _SearchResult2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.items = null;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var searchItems = await _notificationtemplate2.default.find({ Context: req.body.Context });

        result.items = searchItems;
        result.totalcount = searchItems.length;
        result.pages = 1;
        result.message = 'Successfully retrieve records';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.items = 0;
        result.totalcount = 0;
        result.pages = 0;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

async function search(req, res) {
    var result = new _SearchResult2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.items = null;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        if (req.query.limit === null || req.query.limit === undefined) {
            req.query.limit = 20;
        }
        var filters = {};
        if (req.query.Filters != null) {
            filters = (0, _QueryFilters.QueryFilters)(req.query.Filters, req.query.Context);
        } else {
            filters["Context"] = req.query.Context;
        }

        var searchItemRes = await _notificationtemplate2.default.find(filters);

        var totalcount = searchItemRes.length;
        var pages = Math.ceil(searchItemRes.length / req.query.limit);

        var finalItemRes = await _notificationtemplate2.default.find(filters).skip(Number(req.query.skip)).limit(Number(req.query.limit)).sort(req.query.sort);

        result.items = finalItemRes;
        result.totalcount = totalcount;
        result.pages = pages;
        result.message = 'Sucessfully retrieve record';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.items = 0;
        result.totalcount = 0;
        result.pages = 0;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

async function ifMessageTemplateExisted(id) {
    var messageTemplate = await _messagetemplate2.default.findOne({ _id: id });

    if (messageTemplate !== null) return true;

    return false;
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _recipient = __webpack_require__(31);

var RecipientController = _interopRequireWildcard(_recipient);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.post('', RecipientController.create);
routes.put('', RecipientController.update);
routes.delete('/:id', RecipientController.remove);
routes.get('/:id', RecipientController.getById);
routes.get('/searchAll', RecipientController.searchAll);
routes.get('', RecipientController.search);

exports.default = routes;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = create;
exports.update = update;
exports.getById = getById;
exports.remove = remove;
exports.searchAll = searchAll;
exports.search = search;

var _recipient = __webpack_require__(10);

var _recipient2 = _interopRequireDefault(_recipient);

var _Authorization = __webpack_require__(6);

var _Result = __webpack_require__(4);

var _Result2 = _interopRequireDefault(_Result);

var _SearchResult = __webpack_require__(7);

var _SearchResult2 = _interopRequireDefault(_SearchResult);

var _QueryFilters = __webpack_require__(8);

var _axios = __webpack_require__(13);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create(req, res) {
    var result = new _Result2.default();

    try {
        var createRes = await _recipient2.default.create(req.body);

        result.successful = true;
        result.model = createRes;
        result.message = 'Successfully added record';

        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function update(req, res) {
    var result = new _Result2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.UpdatedBy = authenticationRes.model.Name;
            req.body.DateUpdated = new Date();
        }

        var updateRes = await _recipient2.default.findOneAndUpdate({ _id: req.body._id }, req.body, { Upsert: true, strict: false });

        result.successful = true;
        result.model = updateRes;
        result.message = 'Successfully updated record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function getById(req, res) {
    var result = new _Result2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var id = req.params.id;

        if (id === null) {
            result.successful = false;
            result.model = null;
            result.message = 'Id is required';
        }

        var getRes = await _recipient2.default.findOne({ _id: id });

        result.successful = true;
        result.model = getRes;
        result.message = 'Successfully retrieve data';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = null;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function remove(req, res) {
    var result = new _Result2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var id = req.params.id;

        if (id === null) {
            result.successful = false;
            result.model = null;
            result.message = 'Id is required';

            return res.status(400).json(result);
        }

        await _recipient2.default.findOneAndRemove({ _id: id });

        result.successful = true;
        result.model = null;
        result.message = 'Successfully deleted record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = null;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function searchAll(req, res) {
    var result = new _SearchResult2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.item = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var searchRes = await _recipient2.default.find({ Context: req.body.Context });

        result.items = searchItemRes;
        result.totalcount = searchItemRes.length;
        result.pages = 1;
        result.message = 'Successfully retrieve records';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.items = 0;
        result.totalcount = 0;
        result.pages = 1;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

async function search(req, res) {
    var result = new _SearchResult2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        if (req.query.limit === null || req.query.limit === undefined) {
            req.query.limit = 20;
        }
        var filters = {};
        if (req.query.Filters != null) {
            filters = (0, _QueryFilters.QueryFilters)(req.query.Filters, req.query.Context);
        } else {
            filters["Context"] = req.query.Context;
        }

        var searchItemRes = await _recipient2.default.find(filters);

        var totalCount = searchItemRes.length;
        var pages = Math.ceil(searchItemRes.length / req.query.limit);

        var finalItemRes = await _recipient2.default.find(filters).skip(Number(req.query.skip)).limit(Number(req.query.limit)).sort(req.query.sort);

        result.items = finalItemRes;
        result.totalcount = totalCount;
        result.pages = pages;
        result.message = 'Successfully retrieve record';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.items = 0;
        result.totalcount = 0;
        result.pages = 1;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _notification = __webpack_require__(33);

var NotificationController = _interopRequireWildcard(_notification);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.post('/sendSimple', NotificationController.sendSimple);
routes.post('/sendBulk', NotificationController.sendSimpleBulk);
routes.post('/sendPairMessage', NotificationController.sendPairMessage);

exports.default = routes;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendSimple = sendSimple;
exports.sendSimpleBulk = sendSimpleBulk;
exports.sendPairMessage = sendPairMessage;

var _notification = __webpack_require__(9);

var _notification2 = _interopRequireDefault(_notification);

var _Authorization = __webpack_require__(6);

var _Result = __webpack_require__(4);

var _Result2 = _interopRequireDefault(_Result);

var _SearchResult = __webpack_require__(7);

var _SearchResult2 = _interopRequireDefault(_SearchResult);

var _QueryFilters = __webpack_require__(8);

var _recipient = __webpack_require__(10);

var _recipient2 = _interopRequireDefault(_recipient);

var _notificationtemplate = __webpack_require__(3);

var _notificationtemplate2 = _interopRequireDefault(_notificationtemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function sendSimple(req, res) {
    var result = new _Result2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        var recipientIds = [];
        var payload = [];
        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var checkRecipient = await checkIfValidRecipient(req.body.RecipientId);

        if (!checkRecipient.successful) {

            result.successful = false;
            result.model = checkRecipient.model;
            result.message = checkRecipient.message;

            return res.status(400).json(result);
        }

        var checkNotificationTemplate = await checkIfValidNotificationTemplate(req.body.NotificationTemplateId);

        if (!checkNotificationTemplate.successful) {
            result.successful = false;
            result.model = checkIfValidNotificationTemplate.model;
            result.message = checkIfValidNotificationTemplate.message;

            return res.status(400).json(result);
        }

        req.body.Status = 'New';

        var createRes = await _notification2.default.create(req.body);

        result.successful = true;
        result.model = createRes;
        result.message = 'Successfully created record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function sendSimpleBulk(req, res) {
    var result = new _Result2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var checkNotificationTemplate = await checkIfValidNotificationTemplate(req.body.NotificationTemplateId);

        if (!checkIfValidNotificationTemplate.successful) {
            result.successful = false;
            result.model = checkIfValidNotificationTemplate.model;
            result.message = checkIfValidNotificationTemplate.message;

            return res.status(400).json(result);
        }

        for (let recipient in req.body.RecipientIds) {

            var checkRecipient = await checkIfValidRecipient(req.body.RecipientId[recipient]);

            if (!checkRecipient.successful) {
                result.successful = false;
                result.model = checkRecipient.model;
                result.message = checkRecipient.message;

                return res.status(400).json(result);
            }
        }

        var payload = {
            Context: req.body.Context,
            CreatedBy: req.body.CreatedBy,
            Payload: req.body.Payload,
            DeliveryDate: req.body.DeliveryDate,
            Status: 'New',
            NotificationTemplateId: req.body.NotificationTemplateId
        };

        for (let recipient in req.body.RecipientIds) {
            payload['RecipientId'] = req.body.RecipientIds[recipient];

            var createRes = await _notification2.default.create(payload);
        }

        result.successful = true;
        result.model = req.body;
        result.message = 'Successfully created record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function sendPairMessage(req, res) {
    var result = new _Result2.default();

    try {
        var authenticationRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var checkNotificationTemplate = await checkIfValidNotificationTemplate(req.body.NotificationTemplateId);

        if (!checkIfValidNotificationTemplate.successful) {
            result.successful = false;
            result.model = checkIfValidNotificationTemplate.model;
            result.message = checkIfValidNotificationTemplate.message;

            return res.status(400).json(result);
        }

        var payload = {
            Context: req.body.Context,
            CreatedBy: req.body.CreatedBy,
            DeliveryDate: req.body.DeliveryDate,
            Status: 'New',
            NotificationTemplateId: req.body.NotificationTemplateId
        };

        for (let pairRecipientPayload in req.body.PairPayload) {
            var checkRecipient = await checkIfValidRecipient(req.body.PairPayload[pairRecipientPayload].RecipientId);

            if (!checkRecipient.successful) {
                result.successful = false;
                result.model = checkRecipient.model;
                result.message = checkRecipient.message;

                return res.status(400).json(result);
            }
        }

        for (let pair in req.body.PairPayload) {

            payload['RecipientId'] = req.body.PairPayload[pairRecipientPayload].RecipientId;
            payload['Payload'] = req.body.PairPayload[pairRecipientPayload].Payload;

            await _notification2.default.create(payload);
        }

        result.successful = true;
        result.model = req.body;
        result.message = 'Successfully created record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function checkIfValidRecipient(id) {
    var result = new _Result2.default();

    try {
        var recipientRes = await _recipient2.default.findOne({ _id: id });

        if (recipientRes === null) {
            result.successful = false;
            result.model = null;
            result.message = 'Recipient not valid';

            return result;
        }

        result.successful = true;
        result.model = recipientRes;
        result.message = 'Recipient found';

        return result;
    } catch (e) {
        result.successful = false;
        result.model = null;
        result.message = 'Recipient not valid';

        return result;
    }
}

async function checkIfValidNotificationTemplate(id) {
    var result = new _Result2.default();

    try {
        var notifcationTemplateRes = await _notificationtemplate2.default.findOne({ _id: id });

        if (notifcationTemplateRes === null) {
            result.successful = false;
            result.model = null;
            result.message = 'Notification template invalid';

            return result;
        }

        result.successful = true;
        result.model = notifcationTemplateRes;
        result.message = 'Successfully retrieve notification';

        return result;
    } catch (e) {
        result.successful = false;
        result.model = null;
        result.message = 'Notification template invalid';

        return result;
    }
}

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

function buildStylesheets (sheets, async) {
  var output = ''
  if (!sheets) return output

  if (typeof sheets === 'string') {
    sheets = [sheets]
  }

  sheets.forEach(function (sheet) {
    output += !async
      ? `<link rel="stylesheet" href="${sheet}">\n`
      : `<link rel="stylesheet" href="${sheet}" media="none" onload="if(media!=='all')media='all'">\n`
  })

  return output
}

function buildScripts (scripts, async) {
  var output = ''
  if (!scripts) return output

  if (typeof scripts === 'string') {
    scripts = [scripts]
  }

  scripts.forEach(function (script) {
    output += !async
      ? `<script src="${script}"></script>\n`
      : `<script src="${script}" async></script>\n`
  })

  return output
}

module.exports = function (opts) {
  var title = opts.title ? `<title>${opts.title}</title>` : ''
  var headScript = (opts.script && opts.scriptAsync) ? buildScripts(opts.script, opts.scriptAsync) : ''
  var bodyScript = (opts.script && !opts.scriptAsync) ? buildScripts(opts.script, opts.scriptAsync) : ''
  var favicon = opts.favicon ? `<link rel="icon" href="${opts.favicon}">` : ''
  var css = buildStylesheets(opts.css, opts.cssAsync)
  var lang = opts.lang || 'en'
  var dir = opts.dir || 'ltr'
  var head = opts.head || ''
  var body = opts.body || ''

  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
${title}
<meta charset="utf-8">
${favicon}
${head}
${css}
${headScript}
</head>
<body>
${body}
${bodyScript}
</body>
</html>
`
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var extend = __webpack_require__(37);
var regexCache = {};
var all;

var charSets = {
  default: {
    '&quot;': '"',
    '&#34;': '"',

    '&apos;': '\'',
    '&#39;': '\'',

    '&amp;': '&',
    '&#38;': '&',

    '&gt;': '>',
    '&#62;': '>',

    '&lt;': '<',
    '&#60;': '<'
  },
  extras: {
    '&cent;': '¢',
    '&#162;': '¢',

    '&copy;': '©',
    '&#169;': '©',

    '&euro;': '€',
    '&#8364;': '€',

    '&pound;': '£',
    '&#163;': '£',

    '&reg;': '®',
    '&#174;': '®',

    '&yen;': '¥',
    '&#165;': '¥'
  }
};

// don't merge char sets unless "all" is explicitly called
Object.defineProperty(charSets, 'all', {
  get: function() {
    return all || (all = extend({}, charSets.default, charSets.extras));
  }
});

/**
 * Convert HTML entities to HTML characters.
 *
 * @param  {String} `str` String with HTML entities to un-escape.
 * @return {String}
 */

function unescape(str, type) {
  if (!isString(str)) return '';
  var chars = charSets[type || 'default'];
  var regex = toRegex(type, chars);
  return str.replace(regex, function(m) {
    return chars[m];
  });
}

function toRegex(type, chars) {
  if (regexCache[type]) {
    return regexCache[type];
  }
  var keys = Object.keys(chars).join('|');
  var regex = new RegExp('(?=(' + keys + '))\\1', 'g');
  regexCache[type] = regex;
  return regex;
}

/**
 * Returns true if str is a non-empty string
 */

function isString(str) {
  return str && typeof str === 'string';
}

/**
 * Expose charSets
 */

unescape.chars = charSets.default;
unescape.extras = charSets.extras;
// don't trip the "charSets" getter unless it's explicitly called
Object.defineProperty(unescape, 'all', {
  get: function() {
    return charSets.all;
  }
});

/**
 * Expose `unescape`
 */

module.exports = unescape;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(38);

module.exports = function extend(o/*, objects*/) {
  if (!isObject(o)) { o = {}; }

  var len = arguments.length;
  for (var i = 1; i < len; i++) {
    var obj = arguments[i];

    if (isObject(obj)) {
      assign(o, obj);
    }
  }
  return o;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("is-extendable");

/***/ })
/******/ ]);