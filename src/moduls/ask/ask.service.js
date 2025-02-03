const generateUID = require("../../share/utils/generate.id");
const AiService = require("../ai/ai.service");
const FaissService = require("../ai/faiss.service");
const HistoryService = require("../chatHistory/history.service");
const LawService = require("../law/law.service");


module.exports = class AskService{
    constructor(){
            this.aiService = new AiService()
            this.lawService = new LawService()
            this.faissService = new FaissService()
            this.histroyService = new HistoryService()

    }


    ask = async(question,session_id)=>{
        let sessionId = session_id
        if( !sessionId || sessionId ===null || sessionId ===undefined  ){
            sessionId = generateUID() 
        }
        let chatHistory = await this.histroyService.findBySessionId(sessionId)
        if(chatHistory.length===0){
            chatHistory = null
            
        }
 
        const lawData = await this.lawService.findAll()
        const result  =await this.aiService.geminiAi(lawData,question,chatHistory)
         await this.histroyService.create(sessionId,question,result)
        // const createHistory = await this.histroyService.create(sessionId)


        // const findLaw = lawData.filter(data=>data.lawContent.toLowerCase().includes(question.toLowerCase()))
        // console.log(findLaw);
        // const allData = lawData.map(data=>data.lawContent)

        // const foundLaw = await this.faissService.findRelevantLaw(question)
        
        const data = {
            data:result,
            sessionId
        }
        return data 
    }
}      