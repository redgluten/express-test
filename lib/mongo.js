var mongoose     = require('mongoose');
var mongoConf    = require('../conf/mongo.js');
var pollSchema   = mongoose.Schema({ ip: 'String' });
var answerSchema = mongoose.Schema({ answer: 'Text', votes: [pollSchema] });

exports.voteSchema = mongoose.Schema({
  question: { type: 'String', required: true },
  choices: [answerSchema],
})

mongoose.connect(mongoConf.url);
