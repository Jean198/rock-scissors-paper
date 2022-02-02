const express = require("express");
const path=require('path')
const mongoose = require("mongoose");
const Player= require('./models/player');
const bcrypt=require('bcrypt')
const auth= require('./middleware/auth')
const app = express();
const fs = require('fs');


app.use(express.urlencoded());



var port=process.env.PORT || 3000;
require('dotenv').config();


const publicStaticDirPath= path.join(__dirname,'./public');
const viewsPath=path.join(__dirname,'./views');
app.set('view engine', 'ejs')
app.set('views', viewsPath);
app.use(express.static(publicStaticDirPath));




// CONNECTING TO MONGO DATABASE

const connection= async ()=>{
    try{
      const connect= await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
      console.log("conected to db!")
    }catch(e){
      console.log(e.message)
    }
  }
  connection()



  app.get("/", (req, res) => {   
    res.render("game");  // IF I want to add the login functionalities I will change this line to add (index)
  })

  app.get("/login", (req, res) => {
    res.render("login");
  })

  app.get("/register", (req, res) => {
    res.render("register");
  })

  app.get("/home",(req, res) => {
    res.render("home");
  });

  app.get("/game",auth,(req, res) => {
    res.render("game");
  });



  app.post('/register', async (req, res)=>{
    
    const player= new Player(req.body)
    const username=await player.username
    const password=await bcrypt.hash(player.password, 10)

   if (!username || !password){
    return res.send("username or password missing!");
   } 

    const findSimilarPlayer= await Player.findOne({ username });

    if (findSimilarPlayer){
        return res.send("A user with that username already exits please try another one!");
    } 
    

    try{
        player.username=username;
        player.password=password;
        await player.save()
        res.status(201).send("registration succeeded!")

    } catch (error) {
        if (error.code === 1000){
            return res.json({status: 'error', error: 'username already in use'})
        } throw error
        
    }

    
    
})


app.post('/login', async (req, res)=>{

  try{

    const username=await req.body.username
    const password=await req.body.password
    const player= await Player.findOne({username})
    const separator="separator"

    console.log(username, password)

    if (!player) {
        throw new Error('1-Unable to login')
    }

    const isMatch = await bcrypt.compare(password, player.password)

    if (!isMatch) {
        console.log('2-unable to login')
        throw new Error('2-Unable to login')
    }else{
      const token = await player.generateAuthToken()
      const mycookie= token+separator+username
      
      res.cookie('auth',mycookie)
      

        console.log('Granted access');
        
        res.redirect('/game')
        
    }

  }catch{
    res.send("unable to login!")
  }
    
    

   
    

})







  app.listen(port,()=>{
    console.log('application running at port', port)
})