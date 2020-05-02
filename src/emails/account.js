const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
    
//     to: 'sumanthkv04@gmail.com',
//     from: 'www.sumanthsumu04022000@gmail.com',

//     subject:"This is my first creation",

//     text:"i hope it works"
// }).then(()=> {
//     console.log("yes")
// }).catch((err)=> {
//     console.log(err)
// })

const sendWelcomeEmail = (email,name)=> {

    sgMail.send({
        to:email,
        from:'www.sumanthsumu04022000@gmail.com',
        subject:"Thanks for joining",
        text: `Welcome to the app ${name}, Let me know how you get along with us`,

    }).then(()=> {
        console.log("Sent")
    }).catch((err)=> {
        console.log(err)
    })

}

const requestCancel = (email,name)=> {

    sgMail.send({
        to:email,
        from:'www.sumanthsumu04022000@gmail.com',
        subject:"Sorry to see u go",
        text: `Hello ${name}, I dont actually find reason why you were removing the account. If in case any problem please contact us or If u want to actually remove account then its a Goodbye message to u`

    }).then(()=> {
        console.log("sent")
    }).catch(()=> {

    })

}

module.exports = {
    sendWelcomeEmail,
    requestCancel  
}




