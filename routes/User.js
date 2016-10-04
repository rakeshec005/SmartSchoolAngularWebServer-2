var express = require('express');
var router = express.Router();
var userModel = require('../models/user.js');
require('mongoose-query-paginate');
var q = require('q');
var userObject = module.exports = {};


userObject.getUsers = function (req, res) {
  var options = {
    perPage: parseInt(req.query.limit) || 5,
    page: parseInt(req.query.page) || 1,
    sortBy: req.query.sortBy || 'userName', 
  };



  var query = userModel.find({}).sort(options.sortBy);
  query.paginate(options, function (err, result) {
    res.json(result);
  });

}

userObject.createUser = function (req, res) {
  var userObject = new userModel({
    userName: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    roleCode: req.body.role.roleCode,
    email: req.body.email,
    address: req.body.address,
    userActive: req.body.isActive,
    mobileNo: req.body.mobileNo,
    city: "Bengauru",
    subscribeStations: ["SBC", "MAS", "CSTM", "KGP", "BLGR"]
  })

  userObject.save(function (err) {
    if (err) return err;
    res.status(201);
    return res.json({
      "status": 200,
      "success": true,
      "message": "User saved Successfully",
    });
  });
}

userObject.deleteUser = function (req, res) {
  var id = req.params.id;
  userModel.findByIdAndUpdate(id, { 'markDelete': true }, function (result) {
    res.status(201);
    res.json({
      "status": 200,
      "message": "delete Successfully"
    })
  }, function (error) {
    console.log("error" + error);
  })
},

  userObject.searchUerbyQuery = function (req, res) {
    var deferred = q.defer();
    var options = {
      perPage: parseInt(req.query.limi) || 10,
      page: parseInt(req.query.limi) || 1,
      sortBy: req.query.sortBy || 'userName',

    }
    if (req.params.term != '' && req.params.term != null) {
      userModel.find({ "firstName": { '$regex': req.params.term, $options: 'i' } }).then(function (result) {
        deferred.resolve(res.json(result));

      });
    }
    return deferred.promise;
  }

userObject.getOne = function (req, res) {
  var deferred = q.defer();
  if (req.query.userName != '' && req.query.userName != null) {
    userModel.findOne({ "userName": req.query.userName }, function (error, result) {
      if (error) {
        throw new Error("Error in Record Fetching : " + error);
      }
      if (result){
        deferred.resolve(res.json(result));  
      }
      else {
        res.status(401);
        deferred.reject(res.json({
          "status": 401,
          "message": "No Records found"
        }));
       
      }

    });
  }
    return deferred.promise;
}