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

  // initialize tokenizer
  function initialize(resolve, reject) {
    kuromoji.builder({ dicPath: dicPath }).build(function(err, _tokenizer) {
      if ( err ) {
        robot.logger.error(err);
        if ( reject ) { reject(err); }
      } else {
        tokenizer = _tokenizer;
        if ( resolve ) { resolve(); }
      }
    });
  }
  return typeof Promise !== 'undefined' ? new Promise(initialize) : initialize();
}
