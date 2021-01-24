const mongoose = require ('mongoose');

const { Schema } = mongoose;

const blogSchema = new Schema ({
  title: {
      type : String,
      maxlength : 256,
      required : true
  },
  body: {
      type: String,
      required : true
  } ,
  createdAt : {
    type: Date ,
    default : Date.now()
  } ,
  imgURL : String ,
  author : {
    type : Schema.Types.ObjectId , 
    ref : 'User'
  },
  tags : [String] , 
})

const blogModel = mongoose.model('Blog',blogSchema);

module.exports = blogModel;