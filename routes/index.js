var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.redirect("/cropView");
});

router.get('/cropView',function (req,res,next) {
    res.render("cropView.ejs");
});

router.get('/analysisView',function (req,res,next) {
    res.render("analysisView.ejs");
});

module.exports = router;
