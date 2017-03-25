//requires
var express = require('express');
var pg = require('pg');

//globals
var router = express.Router();
var config = {
  database: 'chi',
  host:'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};//ends config object
var pool = new pg.Pool(config);

//routes
  //none for this project

//gets
  //SELECT basic display
  router.get('/',function(req, res){
    //pool setup
    pool.connect(function(error,db,done){
      if(error){
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      }//ends if
      else{
        db.query( 'SELECT * FROM "todo_list"'+
                  'ORDER BY "completed", "priority" DESC;',
                  function(queryError,result){
                    done();
                    if(queryError){
                      console.log("Error making query.");
                      res.sendStatus(500);
                    }//ends if
                    else{
                      res.send(result.rows);
                    }//ends else
                  });//ends db.query
      }//ends else
    });//ends pool.connect
  });//ends SELECT basic display

//posts
  //INSERT INTO new task
  router.post('/add',function(req, res){
    //pull apart the object
    var task = req.body.task;
    var priority = parseInt(req.body.priority);
    var next  = req.body.next_step;

    //pool setup
    pool.connect(function(error,db,done){
      if(error){
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      }//ends if
      else{
        db.query( 'INSERT INTO "todo_list" ("task","priority","next_step")'+
                  'VALUES ($1,$2,$3);',
                  [task,priority,next],
                  function(queryError,result){
                    done();
                    if(queryError){
                      console.log("Error making query.");
                      res.sendStatus(500);
                    }//ends if
                    else{
                      res.sendStatus(201);
                    }//ends else
                  });//ends db.query
      }//ends else
    });//ends pool.connect
  });//ends INSERT INTO new task

//puts
  //UPDATE completed
  router.post('/completed',function(req, res){
    //pull apart the object
    var task = req.body.task;
    var priority = parseInt(req.body.priority);
    var next  = req.body.next_step;

    //pool setup
    pool.connect(function(error,db,done){
      if(error){
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      }//ends if
      else{
        db.query( 'INSERT INTO "todo_list" ("task","priority","next_step")'+
                  'VALUES ($1,$2,$3);',
                  [task,priority,next],
                  function(queryError,result){
                    done();
                    if(queryError){
                      console.log("Error making query.");
                      res.sendStatus(500);
                    }//ends if
                    else{
                      res.sendStatus(201);
                    }//ends else
                  });//ends db.query
      }//ends else
    });//ends pool.connect
  });//ends UPDATE COMPLETED

//deletes

//exports
module.exports = router;
