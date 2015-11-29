var kuromoji = require('kuromoji');

var dicPath = process.env.HUBOT_KUROMOJI_DICTIONARY_PATH || __dirname + '/node_modules/kuromoji/dist/dict/';
var tokenizer = null;
kuromoji.builder({ dicPath: dicPath }).build(function(err, _tokenizer) {
  if ( err ) {
    robot.logger.error(err);
  }
  tokenizer = _tokenizer;
});

module.exports = function(robot) {
  robot.receiveMiddleware(function(context, next, done) {
    if ( tokenizer && context.response.message.tokenized === undefined ) {
      var tokenized = tokenizer.tokenize( context.response.message.text );
      context.response.message.tokenized = tokenized;
    }
    next();
  });
}
