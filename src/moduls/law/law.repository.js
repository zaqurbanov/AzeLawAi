const lawModel = require("./law.model")



module.exports = class LawRepository {

    constructor() {

    }

    create = async (data) => {
        const result = await lawModel.create(data)
        return result
    }
    findAll = async () => {
        const result = await lawModel.find()
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