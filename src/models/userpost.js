const mongoose=require('mongoose');


const postSchema=new mongoose.Schema({
  userid:{
      type:String

  },
  postinfo:{
      type:String
  },
  image:{
      type:Buffer
  },
  posttype:{
      type:String
  }
},{
    timestamps:true
})
const UserPost=mongoose.model('PostSchemao',postSchema)
module.exports=UserPost