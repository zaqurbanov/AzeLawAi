const HistoryRepository = require("./history.repository")


module.exports = class HistoryService {


    constructor() {
            this.histroyRepository = new HistoryRepository()
    }

    create = async (session_id,user,bot) => {
            const data = {
                userMessage:user,
                botMessage:bot,
                session_id
            }
            const result  = await this.histroyRepository.create(data)
            return result



    }

    findBySessionId = async(session_id)=>{
        const result  =await this.histroyRepository.findBySessionId(session_id)
        return result
    }
}