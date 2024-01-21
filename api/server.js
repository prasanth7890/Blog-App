const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const multer = require('multer');
const fs = require('fs');
require("dotenv").config();
const app = express();

const uploadMiddleware = multer(
  { dest: "uploads/" },
  {
    limits: { fieldSize: 25 * 1024 * 1024 },
  }
);

const saltRounds = 10;
const secret = process.env.SECRET;

app.use(cors({credentials: true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

const salt = bcrypt.genSaltSync(saltRounds);

// connecting to db
mongoose.connect(process.env.DB_URL).then(()=>console.log('connected to DB'));


app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const UserDoc = await User.create({
            username: username,
            password: bcrypt.hashSync(password, salt),
        })
        res.json(UserDoc);
    }
    catch(e) {
        res.status(400).json(e);
    }

});

app.post('/login', async (req, res)=> {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username: username});
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if(passOk) {
        //logged in
        jwt.sign({username, id: userDoc.id}, secret, {}, (err, token)=>{
            if(err) throw err;
            // if no error then send a cookie
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        }) 
    }
    else {
        res.status(400).json('Wrong Credentials');
    }
});


app.get('/profile', (req, res)=> {
    try {
        let {token} = req.cookies?.token;
    
        if(!token) {
            console.log('Login to Edit Your Articles');
            return;
        }
        
        jwt.verify(token, secret, {}, (err, info)=>{    
            res.json(info);
        })        
    } catch (error) {
        console.log(error);
    }
});


app.post('/logout', (req, res)=> {
    res.cookie('token', '').json('ok');
})

app.post('/post', uploadMiddleware.single('file'), async (req, res)=> {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ ext;
    fs.renameSync(path, newPath);

    // we are getting the cookie containing the author info...
    const {token} = req?.cookies;

    jwt.verify(token, secret, {}, async (err, info)=>{
        if(err) throw err;

        // uploading data to db
        const {title, summary, content} = req.body;   
        const postDoc = await Post.create({
            title, 
            summary,
            content,
            cover: newPath,
            author: info.id,
        });

        res.json(postDoc)
    });
});


app.get('/post', async (req , res)=>{
    res.json(await Post.find()
    .populate("author", ["username"])
    .sort({createdAt: -1})
    .limit(20)
    );
});

app.get('/post/:id', async (req, res)=> {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
})


app.put('/post',uploadMiddleware.single('file'), async(req, res)=> {
    let newPath = null;
    if(req.file) {
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ ext;
        fs.renameSync(path, newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info)=>{
        if(err) throw err;

        // uploading data to db
        const {id, title, summary, content} = req.body;   
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if(!isAuthor)
        {
            return res.status(400).json('you are not the author');
        }

        await postDoc.updateOne({
            title,
            summary, 
            content,
            cover: newPath ? newPath : postDoc.cover,
        });
        

        res.json(postDoc);
    });
    
})

app.listen(4000, console.log("server is started"));