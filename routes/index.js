var express = require('express');
var router = express.Router();
var multer = require('multer');
//var upload = multer({ dest: './uploads' });

var upload = multer({
  dest: './uploads',
 /* limits: {
         fileSize: 5 * 1000000
    }
    */
});



var user = require('./User.js');
var userUpload = require('./Upload.js');
var userPlan = require('./userPlan.js');
var role = require('./role.js');





router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

// Routes for Authenticaton

router.post('/api/v1/login', auth.login);






// Routes for Users
router.get('/api/v1/admin/users', user.getUsers);
router.post('/api/v1/admin/users', user.createUser);
router.get('/api/v1/admin/users/searchUser/:term', user.searchUerbyQuery);
router.get('/api/v1/admin/users/getOne', user.getOne);








// Routes for UserPlan 
router.get("/api/v1/userPlans", userPlan.getPlan);
router.post('/api/v1/userPlans/savePlan', userPlan.createUserPlan);


//Routes for role
router.get('/api/v1/roles', role.getRole);
router.post('/api/v1/roles', role.creteRole);









module.exports = router;
