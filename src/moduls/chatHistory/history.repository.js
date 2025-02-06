const historyModel = require("./history.model")

module.exports = class HistoryRepository{
    
    constructor(){

    }


    create = async (data)=>{

        const result  = await historyModel.create(data)
        return result
    }

    findBySessionId = async(sessionId)=>{
        
        const result  = await historyModel.find({session_id:sessionId})
        return result
    }
}