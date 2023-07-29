// Create web server    
var express = require('express');
var app = express();
var fs = require("fs");

// Read comments.json
var comments = require('./comments.json');

// Support JSON encoded bodies
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Get comments
app.get('/comments', function (req, res) {
    res.end(JSON.stringify(comments));
})

// Add comment
app.post('/comments', function (req, res) {
    comments.push(req.body);
    fs.writeFile('./comments.json', JSON.stringify(comments), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
    res.end(JSON.stringify(comments));
})

// Delete comment
app.delete('/comments/:id', function (req, res) {
    var id = req.params.id;
    var index = comments.findIndex(function (comment) {
        return comment.id == id;
    });
    comments.splice(index, 1);
    fs.writeFile('./comments.json', JSON.stringify(comments), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
    res.end(JSON.stringify(comments));
})

// Update comment
app.put('/comments/:id', function (req, res) {
    var id = req.params.id;
    var index = comments.findIndex(function (comment) {
        return comment.id == id;
    });
    comments[index] = req.body;
    fs.writeFile('./comments.json', JSON.stringify(comments), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
    res.end(JSON.stringify(comments));
})

// Start server
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    // console.log("Example app listening at http://%s:%s", host, port)
})