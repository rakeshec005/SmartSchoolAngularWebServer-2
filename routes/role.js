
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var roleModel = require('../models/role.js');
var q = require('q');
require('mongoose-query-paginate');



var role = {

  getRole: function (req, res) {
    var options = {
      perPage: parseInt(req.query.limit) || 10,
      page: parseInt(req.query.page) || 1,
      sortBy: req.query.sortBy || 'roleCode'
    };

    var query = roleModel.find({}).sort(options.sortBy);
    query.paginate(options, function (err, result) {
      res.json(result);
    });

  },

  creteRole:function(req,res){
     var roleObject = new roleModel({
            roleCode: req.body.roleCode,
        })

        roleObject.save(function (err) {
            if (err) return err;
            res.status(201);
            return res.json({
                "status": "200",
                "success": true,
                "message": "Role saved Successfully",
            })
        }) 
   }


}




module.exports = role;