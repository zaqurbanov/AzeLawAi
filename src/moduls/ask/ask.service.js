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
        const startTime  = Date.now()
        const lawData = await this.lawService.findAll(question)

        const aiInputSize = JSON.stringify(lawData).length
        console.log("Aiye gonderilen melumatin olcusu:",aiInputSize/1024,"/KB" );
        const endTime  = ((Date.now()-startTime)/1000).toFixed(3)
        
        console.log(" Butun datanin mongodan cekilmesi " + endTime + " /san");

        // console.log(lawData);
        const aiStartTime = Date.now()
        const stream  =await this.aiService.geminiAi(lawData,question,chatHistory)
        
        const aiEndTime = ((Date.now()-aiStartTime)/1000).toFixed(3)
        console.log("Gemini Ainin fikirlesib cavab vermek muddeti " + aiEndTime + " /san");
        
        const result = {
            stream,
            sessionId
        }
        return result 
    }  
}      