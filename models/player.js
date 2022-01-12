const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')

const PlayerSchema = new mongoose.Schema({
    
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,

        /*
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('username is invalid')
            }
        }*/
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [
        {
            token:{
                type:String,
                required:true
            }

        }
    ]
    
},
{collection: 'players'},

)



PlayerSchema.methods.generateAuthToken = async function(){
    const player = this
    const token =  jwt.sign({_id: player._id.toString()}, 'playersnewtoken',  {expiresIn: '1h'})
    

    player.tokens= player.tokens.concat({token})
    
    await player.save()

    return token

}



const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player