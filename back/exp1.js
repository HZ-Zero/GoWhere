var fs = require('fs');
var path = require('path');
var express=require("express")
var app=express()
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
}
)
app.get('/',function (req,res) {
    res.send('hello express')
})
app.get('/rest/query',function (req,res){
    let sum=0
    sum=sum+(req.query.orderType==1?1:2)
    sum=sum+(req.query.highSpeed=='true'?1:0)
    sum=sum+(req.query.onlyTickets=='true'?1:0)
    var file = path.join( './rest/query5.json');
    switch (sum) {
        case 1:file = path.join( './rest/query1.json');break;
        case 2:file = path.join( './rest/query3.json');break;
        case 3:file = path.join( './rest/query2.json');break;
        case 4:file = path.join( './rest/query4.json');break;
    }


    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(data);
        }
    });
} )


app.get('/rest/cities',function (req,res){
    var file = path.join( './rest/cities.json');

    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(data);
        }
    });
} )

app.get('/rest/order',function (req,res){
    var file = path.join( './rest/order.json');

    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(data);
        }
    });
} )

app.get('/rest/train',function (req,res){
    var file = path.join( './rest/train.json');

    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(data);
        }
    });
} )

app.listen(8890,function () {
    console.log("开启了")
})