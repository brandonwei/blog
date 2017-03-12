var express = require("express");
var app = express();
var dao = require('./lib/dao_mongo');

app.get("/mongodb", function(req, res){
    var clientIp = getClientIp(req)
    console.log(clientIp);
    console.log(req);
    res.send("<h>mongodb</h>");
    //var data = {"id":"test","content":"test"};
    //dao.insert("blog_article", data,  function(rs){
    //    console.log(rs)
    //});
});

app.post("/", function(req, res){
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
