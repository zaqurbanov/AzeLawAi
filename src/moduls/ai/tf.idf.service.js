const natural = require("natural")

module.exports = class TfIdfservice{

    constructor(){
        this.tfidf = new natural.TfIdf()
    }

    addDocuments = (laws)=>{
        console.log("tf idf qanunlar doldurulur");
        laws.forEach(law => {
            if(law.lawContent && law.lawContent.trim() !==""){
                this.tfidf.addDocument(law.lawContent)
            }
        });

        console.log("✅ TF-IDF modeli hazırdır!");

    }

    textToVector = (text) => {
        const vector = new Array(300).fill(0);
        const words = text.split(" ");

        words.forEach((word, i) => {
            if (i < 300) {
                vector[i] = this.tfidf.tfidf(word, 0); // Hər sözün TF-IDF dəyərini çıxarırıq
            }
        });

        return vector;
    };
}