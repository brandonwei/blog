var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var dao = require('./lib/dao_mongo');
var ObjectID = require('mongodb').ObjectID;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/add", function(req, res) {
     var title = req.param("title");
     var content = req.param("content");
     var time = Date.now();
     if (!title || !content) {
        res.send(JSON.stringify({
            code: -1,
            message: "参数错误"
        }))
     }
     var data = {
        "title": title,
        "time": time,
        "content": content
     };

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
        res.set("Access-Control-Allow-Origin", "http://blog.brandonwei.cn");
        res.send(JSON.stringify(returnData));
     });
});

app.get("/find", function(req, res){
    var id = req.query["id"];
    var page = req.query["page"];
    var data = {};
    if (id) {
        data._id = ObjectID(id);
    }
    else if (page > 0) {

    }
    else {

    }
    dao.find("blog_article", data, function(rs) {
        console.log(rs);
        var returnData = {};
        returnData.code = 0;
        returnData.data = rs;
        res.set("Access-Control-Allow-Origin", "http://blog.brandonwei.cn");
        res.send(JSON.stringify(returnData));
    });
});

app.post("/delete", function(req, res){
    console.log("test delete");
    var id = req.param("id");
    var data = {};
    if (id) {
        data._id = ObjectID(id);
    }
    else {
        res.send(JSON.stringify({
            code: -1,
            message: "参数错误", 
        }))；
        return;
    }
    dao.remove("blog_article", data, function(rs) {
        console.log(rs);
        var returnData = {};
        returnData.code = 0;
        returnData.data = rs;
        res.set("Access-Control-Allow-Origin", "*");
        res.send(JSON.stringify(returnData));
    });
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
