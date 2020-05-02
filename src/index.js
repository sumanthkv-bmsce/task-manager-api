const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT

// app.use((req,res,next)=> {

//     if(req.method==="GET") {
//         res.send("Get requests are disabled")
//     }
//     else {
//         next()
//     }
// })



// app.use((req,res,next)=> {
    
//     res.status(503).send("Under maintainance mood")

// })


const multer = require('multer')

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=> {
    console.log("Server is in " + port)
})

// const jwt = require('jsonwebtoken')

// const myFun = async()=> {   
//     const token = jwt.sign({ _id:"abc123" },"thisismyfirsttoken",{
//         expiresIn:'1 seconds'
//     })
//     console.log(token)
    
//     const data= jwt.verify(token,'thisismyfirsttoken')
//     console.log(data)
// }

// myFun()




// const main = async ()=> {
//     // const task = await Task.findById("5eab1ab9b51f301ea41b9841")

//     // await task.populate('owner').execPopulate()
//     // console.log(task)

//     const user = await User.findById("5eab19ce10a9f3268cb317a7")

//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)

// }

// main()

const upload = multer({
    dest:'images',
    limits: {
        fileSize:1000000
    },
    fileFilter(req,file,cb) {

        if(!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error("File must be doc or docx"))
        }

        cb(undefined,true)
    }

})

const errorMiddleWare = (req,res,next)=> {

    throw new Error("From my middleware")

}

app.post('/upload',upload.single('upload'),(req,res)=> {
    res.status(200).send();
},(error,req,res,next)=> {
    res.status(400).send({
        error:error.message
    })
})
































