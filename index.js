var express = require('express');
var fs = require('fs');

var app = express();

app.get(/([/\w\d-%;])*(.html|.json|.css|.js|.text)?(\?[\w%]*=[\w%]*)?/, function(request, response){
   var filepath = request.url;
   console.log(filepath);
   var contentType = 'text/html';
   if(filepath.indexOf('.js') != -1){
       contentType = 'text/application';
   }else if(filepath.indexOf('.css') != -1){
       contentType = 'text/plain';
   }
   
   filepath = __dirname + filepath;
   fs.exists(filepath, function(exist){
       if(exist){
           fs.readFile(filepath, function(error, content){
               if(error){
                   response.writeHeader(204, 'Content-Type', 'text/html');
                   response.end("File reading error!");
               }else{
                   response.writeHeader(200, 'Content-Type', contentType);
                   response.end(content, 'utf-8');
               }
           })
       }else{
           response.writeHeader(404, 'content-type', 'text/html');
           response.end("<h1>Eror 404, file not found</h1>");
       }
   })
});

app.listen(80);
