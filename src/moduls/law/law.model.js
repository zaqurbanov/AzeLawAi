
const mongoose = require('mongoose')


const lawSchema =new mongoose.Schema({

    fileName:{
        type:String,
        required:true
    },
    lawContent:{
        type:String,
        required:true
    }
},{timestamps:true,collection:"Law"})


const lawModel = mongoose.model("lawModel",lawSchema) 

module.exports = lawModel