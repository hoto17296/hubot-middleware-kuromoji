var assert = require('assert');

var mockRobot = {
  middleware: null,
  receiveMiddleware: function(middleware) {
    this.middleware = middleware;
  },
};

describe('hubot', function() {

  var promise = require('../')(mockRobot);

  it('should register middleware', function() {
    assert.ok( mockRobot.middleware );
  });

  it('should tokenize message', function(done) {
    if ( ! ( promise && promise.then ) ) {
      assert.ok(true);
      return done();
    }
    promise.then(function() {
      var context = { response: { message: { text: 'すもももももももものうち' } } };
      mockRobot.middleware.apply(undefined, [
        context,
        function() {
          var tokenized = context.response.message.tokenized;
          assert.equal( tokenized[0].surface_form, 'すもも' );
          assert.equal( tokenized[0].pos, '名詞' );
          done();
        },
        function() {},
      ]);
    });
  });

});
