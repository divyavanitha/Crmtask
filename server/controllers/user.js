const express = require("express");
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");

exports.index = async (req, res) => {
  try {
    let user = await User.find({ status: true }).select({ "password": 0 });

    res.send({ user });
  } catch (err) { }
};
exports.user = async (req, res) => {
  try {
    const errors = {};
    User.findOne({_id:req.params.user_id})
   
    .then(user => {
        if (!user) {
            errors.nouser = 'There is no user for this user';
            res.status(404).json(errors);
        }

        res.json(user);
    })
    .catch(err =>
        res.status(404).json({ user: 'There is no user for the ID' })
    );

    res.send({ user });
  } catch (err) { }
};
exports.count = async (req, res) => {
  try {
    let totalusers = await User.count({ status: true });

    res.send({ totalusers });
  } catch (err) { }
};

exports.usesfromtoken = async (req, res) => {
  try {
      if(req.user._id){
      const user = await User.findOne({_id:req.user._id}).select('-password').exec();
     return res.json({user});
    }else{
      return res.json({msg:"Login to get user"});
    }
  } catch (err) {
      console.error(err.message)
      return res.status(500).json({"msg":"Server"})

  }
}