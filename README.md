# hubot-middleware-kuromoji
Tokenize all the messages that Hubot have received by [kuromoji.js](https://www.npmjs.com/package/kuromoji).

## Install
```
npm install hubot-middleware-kuromoji
```

Add `"hubot-middleware-kuromoji"` to your `external-scripts.json`

## Usage
You can use tokenized sentence from `msg.message.tokenized`.

``` coffee
module.exports = (robot) ->

  robot.hear /.*/, (msg) ->
    msg.message.tokenized.map (token) ->
      if token.pos == '感動詞'
        msg.reply token.surface_form
```

```
hubot> こんにちは
Shell: こんにちは
```
