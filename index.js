var kuromoji = require('kuromoji');

module.exports = function(robot) {
  var dicPath = process.env.HUBOT_KUROMOJI_DICTIONARY_PATH || __dirname + '/node_modules/kuromoji/dist/dict/';
  var tokenizer = null;

  // register middleware
  robot.receiveMiddleware(function(context, next, done) {
    var message = context.response.message;
    if ( tokenizer && message.tokenized === undefined && message.text ) {
      message.tokenized = tokenizer.tokenize( message.text );
    }
    next();
  });

  return new Promise(function(resolve, reject) {
    // initialize tokenizer
    kuromoji.builder({ dicPath: dicPath }).build(function(err, _tokenizer) {
      if ( err ) {
        robot.logger.error(err);
        reject(err);
      }
      else {
        tokenizer = _tokenizer;
        resolve();
      }
    });
  });
}
