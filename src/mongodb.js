//CRUD operations using mongodb database

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient,ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL,{useUnifiedTopology:true},(error,client)=> {

    if(error) {
        return console.log("Unable to connect database")
    }

    const db =  client.db(databaseName)
    // db.collection('users').insertOne({
    //     _id:id,
    //     name:"Sumanth VS",
    //     age:20
    // },(error,result)=> {
    //     if(error) {
    //         return console.log("Unable to insert user")
    //     }

    //     console.log(result.ops)
    // })

    // db.collection("users").insertMany([{
    //     name:"Sushmitha",
    //     age:24

    // },
    // {
    //     name:"Anuradha",
    //     age:48
    // }],(error,result)=> {
    //     console.log(result.ops);
    // })

    // db.collection("tasks").insertMany([{
    //     description:"Eating",
    //     completed:true
    // }, {
    //     description:"Sleeping",
    //     completed:false
    // }, {
    //     description:"Coding",
    //     completed:true
    // }],(error,result)=> {
    //     if(error) {
    //         return  console.log("Unable to update ther database");
    //     }

    //     console.log(result.ops);
    
    // })



    // db.collection("users").findOne({_id:new ObjectID("5ea37c2aabceb61708326ec9")},(error,user)=> {
    //     if(error) {  
    //         return console.log("Unable to find");
    //     }   
        
    //     if(user===null) {
    //         return console.log("Not found");
    //     }

    //     console.log(user)
    // })

    // db.collection("users").find({age:20}).count((error,users)=> {
    //     console.log(users)
    // })

    // db.collection("tasks").findOne({_id: new ObjectID("5ea398143eeffa1b2c235ce7")},(error,task)=> {
    //     console.log(task);
    // })

    // db.collection("tasks").find({completed:true}).toArray((error,task)=> {
    //     console.log(task);
    // })


    // const updarePromise =  db.collection("users").updateOne({_id:new ObjectID("5ea37c2aabceb61708326ec9")},{
    //     $set: {
    //         name:"Mike"
    //     }
    // })

    // updarePromise.then((result)=> {
    //     console.log(result)
    // }).catch((error)=> {
    //     console.log(error)
    // })


    // db.collection("users").updateOne({_id:new ObjectID("5ea37c2aabceb61708326ec9")},{
    //     $inc: {
    //         age:2
    //     }
    // }).then((result)=> {

    // }).catch((error)=> {

    // })

    // db.collection("tasks").updateMany({completed:true},{
    //     $set: {
    //         completed:false
    //     }
    // }).then((result)=> {

    // }).catch((error)=> {

    // }) 
    
    
    db.collection("users").deleteOne({
        _id : ObjectID("5ea39354a46af81f68437412")
    }).then((res)=> {

    }).catch((error)=> {

    })



})