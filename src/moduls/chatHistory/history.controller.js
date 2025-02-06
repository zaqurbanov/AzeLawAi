const HistoryService = require("./history.service")


module.exports = class HistoryController{

    constructor(){
        this.histroyService = new HistoryService()
    }

    findBySessionId = async(req,res)=>{
        const {session_id} = req.params

        try {
            const result  = await this.histroyService.findBySessionId(session_id)
            return res.json({
                message:"success",
                data:result
            })
        } catch (error) {
                console.log(error); 
        }
    } 
}