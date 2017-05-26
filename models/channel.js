'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: String,
  content: String,
  created_at: Date
});

const ChannelSchema = new Schema({
  name: String,
  messages: [ MessageSchema ],
  created_at: Date
});

module.exports = mongoose.model('Channel', ChannelSchema);
