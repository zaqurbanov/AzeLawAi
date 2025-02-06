
const faiss = require('faiss-node')
const LawService = require('../law/law.service')
const TfIdfservice = require('./tf.idf.service')
module.exports = class FaissService {


    constructor() {
        this.index = new faiss.IndexFlatL2(300)
        this.lawService = new LawService()
        this.tfIdfService = new TfIdfservice()
        this.lawIndexMap = {}
    }

 trainFaiss = async()=>{
        const allLaws = await this.lawService.findAll()
        if(!allLaws || allLaws.length==0){
            console.warn("data yoxdur")
            return
        }

        this.tfIdfService.addDocuments(allLaws)

        let indexCounter = 0

        allLaws.forEach((law,i)=>{
            if (!law.lawContent || law.lawContent.trim() === "") {
                console.warn(`⚠️ Boş qanun tapıldı: ${law.fileName}, Skip edilir.`);
                return;
            }
            const vector = this.tfIdfService.textToVector(law.lawContent)
            if (vector.length !== 300) {
                console.error(`❌ ERROR: Vektor uzunluğu səhvdir: ${vector.length} (gözlənilən: 300)`);
                return;
            }
            this.index.add([vector])
            this.lawIndexMap[indexCounter]= {lawId:law._id,text:law.lawContent}
            indexCounter++
        })
        console.log(`✅ FAISS Vektor Bazası Təlimləndirildi!`);

 }
 
    
 findRelevantLaw = async (question) => {
    const queryVector = this.tfIdfService.textToVector(question);
    const [bestMatchIndex] = this.index.search([queryVector], 1);

    if (bestMatchIndex === undefined || !this.lawIndexMap[bestMatchIndex]) {
        console.warn("⚠️ FAISS heç bir uyğun qanun tapmadı.");
        return null;
    }

    return this.lawIndexMap[bestMatchIndex];
};
   

    chunkText = (text, chunkSize) => {
        let chunks = [];
        for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.substring(i, i + chunkSize));
        }
        return chunks;
    };


}  