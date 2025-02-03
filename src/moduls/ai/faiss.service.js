
const faiss = require('faiss-node')
const LawService = require('../law/law.service')
module.exports = class FaissService {


    constructor() {
        this.index = new faiss.IndexFlatL2(300)
        this.lawService = new LawService()
    }

    trainFaiss = async () => {
        console.log("🔄 FAISS vektor bazası hazırlanır...");
        const allLaw = await this.lawService.findAll()
        if (!allLaw || allLaw.length === 0) {
            console.warn("⚠️ FAISS-ə əlavə etmək üçün heç bir qanun tapılmadı.");
            return;
        }

        allLaw.forEach((law, i) => {
            if (!law.lawContent || law.lawContent.trim() === "") {
                console.warn(`⚠️ Boş qanun tapıldı: ${law.fileName}, Skip edilir.`);
                return;
            }

            // 🔥 FAISS üçün mətnləri 500 simvol uzunluğunda hissələrə bölürük
            const lawChunks = this.chunkText(law.lawContent, 500);

            lawChunks.forEach((chunk) => {
                const vector = this.textToVector(chunk);

                if (vector.length !== 300) {
                    console.error(`❌ ERROR: Vektor uzunluğu səhvdir: ${vector.length} (gözlənilən: 300)`);
                    return;
                }

                this.index.add([vector]);
                this.lawIndexMap[indexCounter] = { lawId: law._id, text: chunk };
                indexCounter++;
            });
        });

        console.log(`✅ FAISS Vektor Bazası Təlimləndirildi! Toplam: ${this.index.ntotal} qanun hissəsi əlavə edildi.`);
    };
 
    textToVector = (text) => {
        if (!text || text.trim() === "") {
            console.warn("⚠️ Boş mətn vektora çevrilə bilməz.");
            return Array(300).fill(0);
        }

        const vector = new Array(300).fill(0);
        const textLength = Math.min(text.length, 300);

        for (let i = 0; i < textLength; i++) {
            vector[i] = text.charCodeAt(i) / 255;
        }

        return vector;
    };

    findRelevantLaw = async (question) => {
        if (this.index.ntotal === 0) {
            console.warn("⚠️ FAISS Vektor Bazası boşdur! Əvvəlcə `trainFaiss()` metodunu çağır.");
            await this.trainFaiss();
        }

        const queryVector = this.textToVector(question);

        if (queryVector.length !== 300) {
            console.error("❌ ERROR: Sual üçün yaradılan vektorun ölçüsü düzgün deyil.");
            return null;
        }

        const [bestMatchIndex] = this.index.search([queryVector], 1);

        if (bestMatchIndex === undefined || !this.lawIndexMap[bestMatchIndex]) {
            console.warn("⚠️ FAISS heç bir uyğun qanun tapmadı.");
            return null;
        }

        const matchedLaw = this.lawIndexMap[bestMatchIndex];
        const result = await this.lawService.findById(matchedLaw.lawId);

        return {
            law: result,
            matchedText: matchedLaw.text
        };
    };

    chunkText = (text, chunkSize) => {
        let chunks = [];
        for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.substring(i, i + chunkSize));
        }
        return chunks;
    };


}  