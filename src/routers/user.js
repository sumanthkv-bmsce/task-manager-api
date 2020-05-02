const express = require('express')
const User = require('../models/user')
const task = require('../models/task')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')  
const {sendWelcomeEmail,requestCancel} = require('../emails/account')

const router = new  express.Router()

router.post('/users',async(req,res)=> {
    //console.log(req.body)

     const user = new User(req.body)
    // user.save().then((user)=> {
    //     res.status(201).send(user)

    // }).catch((error)=> {
    //     res.status(400).send(error)

    // })

    try {
        await user.save()
        sendWelcomeEmail(user.email,user.name);
        const token = await user.generateAuthToken()

        res.status(201).send({user,token})
    }
    catch(err) {
        res.status(400).send(err)
    }
})

router.get('/users/me',auth,async(req,res)=> {
    // User.find({}).then((users)=> {
    //     res.status(201).send(users)

    // }).catch((error)=> {
    //     res.status(500).send(error)

    // })

    //console.log(req.user)
    // try {
    //     const users = await User.find({});
    //     res.status(201).send(users);
    // }
    // catch(err) {
    //     res.status(500).send(err);
    // }

        res.send(req.user)

})

router.post('/users/login',async (req,res)=> {

    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()

        res.status(200).send({user,token})
    }

    catch(e) {
        res.status(400).send()
    }

})



router.post('/users/logout',auth,async(req,res)=> {

    try {
        req.user.tokens  = req.user.tokens.filter((token)=> {
            return token.token!==req.token
        })

        await req.user.save()

        res.status(200).send()
    }
    catch(e) {
        res.status(500).send()
    }

})

router.post('/users/logoutAll',auth,async(req,res)=> {

    try {

        req.user.tokens=[]
        await req.user.save()
        res.status(200).send()  
    }

    catch(e) {
        res.status(500).send()
    }

})

router.patch('/users/me',auth,async(req,res)=> {

    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","email","password","age"]
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error:"Invalid updates"})
    }

    try {
        //const userr = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

        const user =(await User.findById(req.user._id)) 
        
        updates.forEach((update)=> {
            user[update] = req.body[update] 
        })

        await user.save()
        res.send(user);

    }
    catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth,async(req,res)=> {

    try {
        //const uu = await User.findByIdAndDelete(req.user._id)

        await req.user.remove()
        requestCancel(req.user.email,req.user.name)
        res.status(201).send(req.user)
        
    }
    catch(er) {
        res.status(500).send(er);   
    }

})



// router.post('/users/me/avatar',errorMiddleWare,(req,res)=> {
//     res.status(200).send();
// },(error,req,res,next)=> {
//     res.status(400).send({
//         error:error.message
//     })
// })

const upload = multer({
    limits: {
        fileSize:1000000
    },

    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error("File must be png or jpg or jpeg"))
        }

        cb(undefined,true)
    }

})

router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=> {
    //console.log(req.file)
    //req.user.avatar = req.file.buffer

    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.status(200).send();

},(error,req,res,next)=> {
    res.status(400).send({
        error:error.message
    })
})


router.delete('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=> {

    req.user.avatar = undefined;

    await req.user.save()

    res.status(200).send()

},(error,req,res,next)=> {
    req.status(400).send()
})


router.get('/users/:id/avatar',async(req,res)=> {

    try {

        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Error()   
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)

    }
    catch(e) {
        res.status(404).send()
    }

})


module.exports = router;