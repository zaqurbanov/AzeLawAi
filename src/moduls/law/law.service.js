
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
            const trimmedPdf = parsedPdf.text.trim()
            const parsedFileName = fileName.split(".")[0]
            const articles = this.extractArticles(trimmedPdf) 
                const formattedArticles = articles.map(article=>{
                    return {
                        fileName:parsedFileName,
                        articleNumber:article.articleNumber,
                        title:article.title,
                        lawContent:article.lawContent
                    }
                })
                const result  = await this.lawRepository.createMany(formattedArticles)
            fs.unlinkSync(filePath) 
            
            return result

    }

    extractArticles = (fullText)=>{
        const lines = fullText.split('\n')
        let currentArticles = null
        const articles = []
        for (const line of lines) {

                if(line.startsWith("Maddə ")){
                    if(currentArticles){
                        articles.push(currentArticles)
                    }
                    let parts = line.split(".")
                    let articleNumber = parts[0]
                    let title = parts[1]
                    
                    currentArticles = {articleNumber,title,lawContent:""}
                }else if(currentArticles && line.length >0){
                        currentArticles.lawContent+=line + " "
                }

                
        }
        
        return articles
    }

    findAll = async(searchParam)=>{
        const result  = await this.lawRepository.findAll(searchParam)
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