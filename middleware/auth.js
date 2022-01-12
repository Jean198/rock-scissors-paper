const jwt = require('jsonwebtoken')
const Player= require('../models/player')




const auth= async(req,res, next)=>{

    
    
    try{
        
        const authHeader= (req.headers.cookie).split('=')
        console.log(authHeader)
        const newstring= authHeader[1].split('separator')
        const token=newstring[0]
        const playerName=newstring[1]
        console.log(playerName)
        
        
        
        
        
        //const token = req.header('Authorization:').replace(' Bearer ','')
         const decoded =await jwt.verify(token, 'playersnewtoken')
         
         
         const player = await Player.findOne({ _id: decoded._id, 'tokens.token':token })
        



         if(!player){
             throw new Error()
         }
         req.player = player
         next()
    }catch(e){
        res.clearCookie('auth')
        res.redirect('/login')
    }
    
}

module.exports = auth