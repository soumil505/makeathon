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
        var crop = recommend(hums[hums.length-1],temps[temps.length-1]);
        console.log(crop)

        res.render("cropView.ejs",{h:hums,t:temps,c:crop});
    });

});

router.get('/analysisView',function (req,res,next) {
    res.render("analysisView.ejs")
});

function recommend(hum,temp)
{
    temp=Number(temp)
    console.log(temp)
    var recs=["मूंगफली","मक्का","धान"]


    if (temp<27 && temp>18) return ["मक्का",1919]
    if (temp<20 && temp>16) return ["धान",1668]
    if (temp<35 && temp>21) return ["मूंगफली",1521]
    return ["मक्का",1919]
}

module.exports = router;
