
const fs = require("fs")
const path = require("path")
const pdf = require("pdf-parse")
    const pdfPath = path.join(__dirname,"pdfs")
    const lawJson = path.join(__dirname,"laws.json")
const pdfConvert =async ()=>{


    if(fs.existsSync(lawJson)){
        console.log("Json fayli artiq movcuddur");
        return JSON.parse(fs.readFileSync(lawJson,"utf-8"))
    }
    
    const getAllPdfFile = fs.readdirSync(pdfPath)
    
    console.log(getAllPdfFile);
    const pdfTextsArray = await Promise.all(
        
        getAllPdfFile.map(async (file,index)=>{
            console.log(`${index} nomreli pdf islenir`);
            const filePath = path.join(pdfPath,file)
            const pdfBuffer = fs.readFileSync(filePath)
            const text = await pdf(pdfBuffer)
            const resultText = text.text
            console.log(`${index} nomreli pdf islendi`);
            return {
                law:file.replace(".pdf"),
                text:resultText
            }
        })
    )
    console.log(pdfTextsArray);
    fs.writeFileSync(lawJson,JSON.stringify(pdfTextsArray,null,2))
    console.log("Bitti");
    return "salam"
} 

module.exports = pdfConvert   