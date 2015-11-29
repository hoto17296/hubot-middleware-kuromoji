var kuromoji = require('kuromoji');

module.exports = function(robot) {

  robot.receiveMiddleware(function(context, next, done) {
    var dicPath = process.env.HUBOT_KUROMOJI_DICTIONARY_PATH || __dirname + '/node_modules/kuromoji/dist/dict/';
    kuromoji.builder({ dicPath: dicPath }).build(function(err, tokenizer) {
      if ( err ) {
        robot.logger.error(err);
      }
      else if ( context.response.message.tokenized === undefined ) {
        var tokenized = tokenizer.tokenize( context.response.message.text );
        context.response.message.tokenized = tokenized;
      }
      next();
    });
  });

}
