/* in this way we are implementing sessions */
const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');
let app = express();

mongoose.connect("mongodb://localhost/storeData");

let authSchema = new mongoose.Schema({
    username : {
        type : String,
        unique:true
    },
    password :{
        type: String
    },
    email :{
        type: String
    }
});

let model = mongoose.model('authSchema',authSchema);

let port = process.env.PORT || 3000;

app.set('view engine','ejs');
app.use(session({
    cookie:{
        maxAge : 5000
    },
    secret : "aniket is a nice kid",
    saveUninitialized : false,
    resave : false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{

    res.locals.user = req.session;
    next();
});
function isAuthenticated(req,res,next){
    if(!req.session.username){
        console.log('please log in');
    }
    console.log('logged in');
    next();
}
app.get('/',isAuthenticated,(req,res)=>{
    res.render('index.ejs');
});
app.post('/signup',(req,res)=>{
    let userCredentials = {
        username : req.body.username,
        password : req.body.password,
        email : req.body.email
    }

    model.create(userCredentials,(err,created)=>{

        if(err){
            console.log(err);
        }
        console.log(created);
        res.redirect('/signin');
    });
});

app.get('/signup',(req,res)=>{
    res.render('signup.ejs');
});



app.post('/signin',(req,res)=>{

    let username ={username : req.body.username};

    model.findOne(username,(err,found)=>{
        if(err){
            res.redirect('/signin');
        }

        req.session.username = found.username;
        req.session.password = found.password;
        req.session.email = found.email;
        res.redirect('/');
        
    });
});
app.get('/signin',(req,res)=>{

    res.render('signin.ejs');
});

app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send('cant be logged out');
        }
        res.redirect('/signin');
    })
});



app.listen(port,(err)=>{
    if(err){
        throw err;
    }

    console.log(`The server has started on ${port}`);
});


