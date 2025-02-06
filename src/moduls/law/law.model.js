
const mongoose = require('mongoose')


const lawSchema = new mongoose.Schema({

    fileName: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    articleNumber: {
        type: String
    }
    ,
    lawContent: {
        type: String,
        required: true
    }
}, { timestamps: true, collection: "Law" })

lawSchema.index({ lawContent: "text" })


const lawModel = mongoose.model("lawModel", lawSchema)

module.exports = lawModel