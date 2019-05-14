const nodemailer = require('nodemailer');
let transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user : 'aniket6991@gmail.com',
        pass:'Aniket 1996'
    }
});

let message = {
    from : "aniket6991@gmail.com",
    to : "karan.saj@gmail.com",
    subject : "hey karan , this is a mail sent from node mailer",
    text : " i love you ",
    html : "<h1> i love you 3000</h1>"

}

transport.sendMail(message,(err,info)=>{
    if(err){
        console.log(err);
    }
    console.log(info);
});