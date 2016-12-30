
try {
    console.log('here');
    var pdfGen = require('./backend/pdfgen.js');
    var path = require('path');
    var express = require('express');
    var app = express();

    app.set('port', (process.env.PORT || 5000));

    // views is directory for all template files
    app.set('views', __dirname + 'site/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

    app.get('/', function(request, response) {
      response.render('index')
    });

    app.get('/pdfcount', function(request, response){
      response.sendFile(path.join(__dirname, './backend/count.txt'))
    });

    app.get('/pdfgen', function(request, response){
        res.sendFile(path.join(__dirname, './Resume_Gen/pdfs', docName));
    });

} catch (err){
    console.log(err)
}
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });