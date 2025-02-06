const lawModel = require("./law.model")



module.exports = class LawRepository {

    constructor() {

    }

    create = async (data) => {
        const result = await lawModel.create(data)
        return result
    }
    createMany = async(data)=>{
        const result  = await lawModel.insertMany(data)
        return result
    }
    findAll = async (searchParam = "") => {

        // const allData = await lawModel.find()
        // console.log("Butun datalar",allData.length);
        console.log("Search param :",searchParam);
        const result =await lawModel.find({$text:{$search:searchParam}},{lawContent:1,_id:0}).lean()
        console.log("searchli datalar",result.length);

        return result
    } 
    findOne = async (question) => {
        const result = await lawModel.findOne({ lawContent: { $regex: question, $options: "i" } })
        return result
    }
    findById = async (id) => {
        const result = await lawModel.findById(id)
        return result
    }
}