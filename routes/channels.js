var express = require('express');
var Channel = require('../models/channel');
var server = require('../bin/www');
var io = require('socket.io')(server);
var router = express.Router();

var respond = (res, err, results) => {
  if (err) {
    console.log(err);
    res.send(err);
  }
  res.json(results);
}

router.get('/', function(req, res, next) {
  Channel.find({}, '_id name ' , (err, channels) => {
    respond(res, err, channels);
  });
});

router.get('/:channel_id/', function(req, res, next) {
  Channel.findById(req.params.channel_id, (err, channel) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    io.on('connection', function(socket){
      socket.join(channel._id);
    });
    res.json(channel);
  });
});

router.post('/', function(req, res) {
  Channel.create({
    name: req.body.name,
    created_at: new Date()
  }, (err, channel) => {
    respond(res, err, channel);
  });
});

module.exports = router;
