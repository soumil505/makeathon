var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');


mongoose.connect('mongodb://soumil:soumil32@ds223253.mlab.com:23253/makeathon').then(() => {
    console.log('Database connection successful')
})
    .catch(err => {
        console.error(err)
    });
var userSchema = new mongoose.Schema({
    "name":String,
    "humidity":String,
    "temperature":String
});

var userModel=mongoose.model('user',userSchema);


/* GET home page. */
router.get('/', function(req, res, next) {

  res.redirect("/cropView");
});

router.get('/cropView',function (req,res,next) {

    userModel.find({},(err,data)=>{
        var hums=[];
        var temps=[];
        data.forEach((point)=>{
            var humidity=point.humidity;
            var temperature=point.temperature;
            hums.push(humidity);
            temps.push(temperature);
        });
        res.render("cropView.ejs",{h:hums,t:temps});
    });

});

router.get('/analysisView',function (req,res,next) {
    res.render("analysisView.ejs");
});

module.exports = router;
