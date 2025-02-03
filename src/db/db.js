const { default: mongoose } = require("mongoose");
const ENV = require("../ENV/env");


class MongoConnection{
    
    constructor(){

    }

    static async connect (){
        try {
            console.log("Connecting!!!");
              await mongoose.connect(ENV.MONGO_PATH)
               console.log("Connected!!!"); 
        } catch (error) {
            console.log("MOngo erroru var");
            console.log(error.message);
        }
    }
}

module.exports = MongoConnection 