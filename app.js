var express    = require('express');
var app        = express();
var router     = express.Router();
var bodyParser = require('body-parser');
var apiRouter  =  require ('./routes/apiRouter');
var fs = require('fs');
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.get('/pdf/:id', function (req, res) {
  var filePath = "/pdf/document-" + req.params.id +".pdf";

  fs.readFile(__dirname + filePath , function (err,data){
      res.contentType("application/pdf");
      res.send(data);
  });
});
app.use('/api', apiRouter);

app.listen(8000, function(){
  console.log('¡Servidor encendido!');
  console.log('La API Restfull está usando el puerto 8000.');
});
