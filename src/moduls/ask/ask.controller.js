const AskService = require("./ask.service")


module.exports = class AskController{
    
    
    constructor(){
        this.askService = new AskService()
    }

    ask =async (req,res)=>{
        try {
            const {question,session_id} = req.body
            const result = await this.askService.ask(question,session_id)

            res.json({
                message:"success",
                answer:result.data,
                sessionId:result.sessionId
            })

        } catch (error) {
            console.log(error);
        }
    }
}