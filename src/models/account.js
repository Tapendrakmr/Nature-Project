const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,

    },
    password:{
        type:String,
        minlength:7,
        trim:true
    },
    country:{
        type:String,
        trim:true
    },
    otptemp:{
       type:Number,
       default:000000
    },
    otpconfirm:{
       type:Number,
       default:000000
    },


    confirmation:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const Useraccount=mongoose.model('UserAccount',userSchema)
module.exports=Useraccount