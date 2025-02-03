

const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({

    userMessage:{
        type:String,

    },
    botMessage:{
        type:String
    },
    session_id:{
        type:String,
        required:true
    }
},{timestamps:true,collection:"History"}) 


const historyModel = mongoose.model("HistoryModel",HistorySchema)


module.exports = historyModel