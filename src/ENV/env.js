 
 const env = require("dotenv")
 env.config()


const ENV = {
    GEMINI_KEY:process.env.GEMINI_KEY,
    MONGO_KEY:process.env.MONGO_KEY,
    MONGO_PATH:process.env.MONGO_PATH
}

module.exports = ENV 