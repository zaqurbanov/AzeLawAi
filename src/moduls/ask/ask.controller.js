const HistoryService = require("../chatHistory/history.service")
const AskService = require("./ask.service")


module.exports = class AskController {


    constructor() {
        this.askService = new AskService()
        this.historyService = new HistoryService()
    }

    ask = async (req, res) => {
        try {
            const { question, session_id } = req.body

            res.setHeader("Content-Type", "text/plain; charset=utf-8")
            res.setHeader("Transfer-Encoding", "chunked");
             res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");


            const result = await this.askService.ask(question, session_id)
            const {stream,sessionId} = result
            // console.log(result.stream());
            res.write( JSON.stringify({sessionId})+"\n")
            let botAnswer = ""
            for await (const chunk of stream){
                const chunkText = chunk.text()
                botAnswer+=chunkText
                res.write(chunkText)

            } 
            
        await this.historyService.create(sessionId,question,botAnswer) 
            
    console.log("Cavab bitti");               
            res.end()
        } catch (error) {
            console.log(error);
        }
    }
}