


const LawService = require('./law.service')
module.exports = class LawController {

    constructor() {
        this.lawService = new LawService()

    }

    addNewLaw = async (req, res) => {

        try {
            const filePath = req.file.path
            const fileName = req.file.originalname
            const result = await this.lawService.addNewLaw(filePath, fileName)


            res.json({
                message: "upload success",
                data:result
            })

        } catch (error) {
            console.log(error);
        }
    }
    findAll = async (req,res) => {
        try {
            const result  =await this.lawService.findAll()
            res.json({
                message:"success",
                data:result
            }) 
        } catch (error) {
            console.log(error);
        }
    }

}