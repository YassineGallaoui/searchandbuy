var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
app.use("/stylesheet", express.static(__dirname+"/stylesheet"));
app.use("/img", express.static(__dirname + '/img'));
app.use("/js", express.static(__dirname + '/js'));

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

// add other routes below
app.get('/purchases', function (req, res) {
  res.sendFile(path.join(__dirname + 'acquisti.html'));
});
app.get('/cart', function (req, res) {
    res.sendFile(path.join(__dirname + 'carrello'));
  });
app.get('/userdata', function (req, res) {
    res.sendFile(path.join(__dirname + 'datipersonali'));
  });
app.get('/signiin', function (req, res) {
    res.sendFile(path.join(__dirname + 'iscrizione'));
  });
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + 'login'));
  });
app.get('/product', function (req, res) {
    res.sendFile(path.join(__dirname + 'prodotto'));
  });
app.get('/sell', function (req, res) {
      res.sendFile(path.join(__dirname + 'vendi'));
    });

app.listen(process.env.PORT || 8080);