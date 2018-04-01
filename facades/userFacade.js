const mongoose = require('mongoose');
const User = require('../models/user');


function addUser(firstName,lastName,userName,password) {
  let pass = "fasdfasdf" + password;
  let userInfo = { firstName, lastName, userName, pass };
  let user = new User(userInfo);
  return user.save();
}

function getAllUsers() {
  return User.find({ }).exec();
}

function findByUsername(username) {
  return User.findOne({ userName:username }).exec();
}

function addLocationBlog(info, author, longitude, latitude) {
  let LocationBlogInfo = { info, pos: { longitude, latitude }, author };
  let newLocationBlog = new LocationBlog(LocationBlogInfo);
  return newLocationBlog.save();
}

module.exports = {
  addUser: addUser,
  getAllUsers: getAllUsers,
  findByUsername: findByUsername,
  addLocationBlog: addLocationBlog
}