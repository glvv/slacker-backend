'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const oAuthTypes = [
  'facebook'
];

const UserSchema = new Schema({
  first_name: { type: String, default: ''},
  email: { type: String, default: '' },
  last_name: { type: String, default: ''},
  username: { type: String, default: '' },
  provider: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' },
  auth_token: { type: String, default: '' },
  facebook: {},
  created_at: Date
});

const validatePresenceOf = value => value && value.length;

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });


mongoose.model('User', UserSchema);
