
const fs = require('fs')
const pdf = require('pdf-parse')
const LawRepository = require('./law.repository')




module.exports = class LawService{
    
    
    constructor(){
        this.lawRepository = new LawRepository()
    }

    addNewLaw = async(filePath,fileName)=>{
            const bufferPdfFile = fs.readFileSync(filePath)
            const parsedPdf = await pdf(bufferPdfFile)
            const trimmedPdf = parsedPdf.text
            const createdFile = {
                fileName:fileName,
                lawContent:trimmedPdf
            }
            const create = await this.lawRepository.create(createdFile)

            fs.unlinkSync(filePath) 
            return create
    }

    findAll = async()=>{
        const result  = await this.lawRepository.findAll()
        return result
    }
    findOne =async(question)=>{
        const result  = await this.lawRepository.findOne(question)
        return result
    }
    findById = async(id) =>{
        const result = await this.lawRepository.findById(id)
        return result
    }
}  