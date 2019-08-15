
const path = require('path');
//require mysql in node modules to use it
const mysql = require('mysql');

module.exports = function(app, connection){
    // If no matching route is found default to index.html
    app.get('/', function(req, res){
       // res.send('Hello Shawn connecting React, Node and mysql');
       connection.query('SELECT * FROM `waytecinventory`.reactnode_users;', function(err, data){
           (err)?res.send(err):res.json({users: data});
       });
    });

    app.get('/users', function(req, res) {
        // res.send('Hello from simple-react project');
        connection.query('SELECT * FROM `waytecinventory`.reactnode_users;', function(err, data) {
            (err)?res.send(err):res.json({users: data});
          });
    });
}