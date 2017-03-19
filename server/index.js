var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var dao = require('./lib/dao_mongo');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/add", function(req, res) {
     var title = req.param("title");
     var content = req.param("content");
     var time = Date.now();
     var data = {
        "title": title,
        "time": time,
        "content": content
     }

     dao.insert("blog_article", data, function(rs) {
        console.log(rs);
        var returnData = {};
        if (rs.result.ok == 1) {
            returnData.code = 0;
            returnData.data = {
                id: rs.ops[0]._id,
                title: rs.ops[0].title,
                content: rs.ops[0].content,
                time: rs.ops[0].time
            }
        }
        else {
            returnData.code = -1;
        }
        res.set("Access-Control-Allow-Origin", "*");
        res.send(JSON.stringify(returnData));
     });
});

app.post("/find", function(req, res){
    cosole.log(req);
});

app.post("/delete", function(req, res){
    cosole.log(req);
});

app.post("/update", function(req, res){
    cosole.log(req);
});

var getClientIp = function(req)
{
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};
app.listen(3000);
