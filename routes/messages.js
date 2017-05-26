var express = require('express');
var router = express.Router();
var server = require('../bin/www');
var io = require('socket.io')(server);

var Channel = require('../models/channel');

router.post('/', function(req, res) {

  let message = {
    author: req.body.author,
    content: req.body.content,
    created_at: new Date()
  };

  let updatedChannel = Channel.findByIdAndUpdate(
        req.body.channel_id,
        {$push: {"messages": message}},
        {safe: true, new : true},
        function(err, model) {
          if (err) {
            console.log(err);
            res.send(err);
          }
            io.to(req.body.channel_id).emit(JSON.stringify(message));
            res.json(model.messages[model.messages.length - 1]);
        }
  );
});

module.exports = router;
