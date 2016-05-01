var kuromoji = require('kuromoji');
var fs = require('fs');

function availablePaths(paths) {
  if ( ! Array.isArray(paths) ) {
    paths = Array.prototype.slice.call(arguments);
  }
  return paths.filter(function(path) {
    try { fs.statSync(path); }
    catch(e) { return false; }
    return true;
  });
}

module.exports = function(robot) {
  var dicPaths = [
    process.env.HUBOT_KUROMOJI_DICTIONARY_PATH,
    require.resolve('kuromoji').replace(/(\/node_modules\/kuromoji\/).*$/, '$1dist/dict'),
  ];
  var dicPath = availablePaths(dicPaths)[0];
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
