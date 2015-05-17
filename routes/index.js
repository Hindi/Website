var express = require('express');
var router = express.Router();
var path    = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname+'/../views/index.html'));
    res.render('index', { title: 'Stud - Home' })
});


/* GET towerwar page. */
router.get('/towerwar', function(req, res, next) {
    res.render('towerwar', { title: 'Stud - TW' })
    //res.sendFile(path.join(__dirname+'/../views/towerwar.html'));
});

/* GET work page. */
router.get('/work', function(req, res, next) {
    requestWorkList(req, res);
    //res.sendFile(path.join(__dirname+'/../views/work.html'));
});

var requestWorkList = function(req, res)
{
    var db = req.db;
    var collection = db.get('worklist');
    collection.find({type : "robots"},{"sort" : [['year', -1]]},function(e,botsresults){
        collection.find({type : "games"},{"sort" : [['year', -1]]},function(e,gamesresults){
            collection.find({type : "video"},{"sort" : [['year', -1]]},function(e,videoresults){
                showWork(res, botsresults, gamesresults, videoresults);
            });
        });
    });
}

var showWork = function(res, botsresults, gamesresults, videoresults) {
    res.render('work', { title: 'Stud - Work', "robotlist" : botsresults, "gamelist" : gamesresults, "videolist" : videoresults })
}

module.exports = router;
