import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import postRoutes from './routes/posts.js'
import bcrypt from 'bcrypt';
import 'dotenv/config'

const app = express();

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const saltRounds = 10;

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

// mongo db
const CONNECTION_URL = 'mongodb+srv://jravelle:Bnjygs23@cluster0.mc1if.mongodb.net/gameswap?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
        .catch((error) => console.log(error.message))

// Post routes
app.use('/posts', postRoutes)

//user schema 
const userSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String
})

const User = new mongoose.model("User", userSchema)

// Login and Register Routes
app.post("/Login",(req,res)=>{
        const {email,password} =req.body;
        User.findOne({email:email},(err,user)=>{
                if(user){
                        console.log(user);
                        bcrypt.compare(password, user.password, function(err, result) {
                                if(result == true){
                                        res.send({message:"login success",user:user})
                                }else{
                                        res.send({message:"wrong credentials"})
                                }
                        });
                       
                }else{
                res.send("not register")
                }
        })
});
app.post("/Register",(req,res)=>{
        console.log('BODY', req.body) 
        const {email,password,username} = req.body;

        User.findOne({email:email},(err,user)=>{
                
        if(user) {
          res.send({message:"User already exists"})
        } else {
                bcrypt.hash(password, saltRounds, function(err, hash) {
                        const user = new User({email,password:hash, username})
                        user.save(err=>{
                                if(err){
                                        console.log(err);
                                        res.send(err)
                                } else{console.log('success');
                                        res.send({message:"success",user:user})
                                }
                        })
                  });
        
        }
})
}) 

// RAWG API
app.get("/rawg/:search",(req,res)=>{
        const key = process.env.RAWG_API_KEY;
        const search = req.params.search;
        let searchString = `https://api.rawg.io/api/games?key=${key}&search=${search}&parent_platforms=2,3,7,9,11&page=1&page_size=3`
        axios
        .get(searchString)
        .then(response =>{
                res.send(response.data)
        })
        .catch(err =>{
                console.log(err);
        })
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})