const { GoogleGenerativeAI } = require("@google/generative-ai")
const ENV = require("../../ENV/env")


module.exports = class AiService {
    constructor() {
        const geminiApiKey = ENV.GEMINI_KEY
        this.genAi = new GoogleGenerativeAI(geminiApiKey)
    }


    geminiAi = async (data, question,chatHistory) => {

        let isChathistory = null
        if(chatHistory ==null){
             isChathistory = "Sohbet tarixi yoxdur"  

        } 
        isChathistory = chatHistory
        const prompt = `
        Azərbaycan qanunlarına əsaslanaraq istifadəçinin sualını cavablandırın. 
        **Sən Azərbaycan hüquq məsləhətçisisən. İstifadəçinin sualına ən uyğun hüquqi cavabı verməlisən.**
**Sualın aid olduğu qanunu axtar və istifadəçiyə hüquqi izah ver.**
**Real həyatdan nümunələr gətir.**
**Mürəkkəb suallar üçün istifadəçidən əlavə məlumat soruş.**
**Qanunlar arasında əlaqəni izah et.**

      Aşağıdakı hüquqi məlumatlardan istifadə edərək cavab verin. Əgər sualın cavabını tapa bilməsən, bunu istifadəçiyə bildir:
${data} // **Yalnız ilk 2000 simvolu göndəririk**


        Qanunlarin maddelerini bildirin.
        **Hüquq məsləhətçisi kimi davran**
        **İstifadəçiyə qanun maddələrini izah et və real həyat nümunələri ver**
        **Əgər əlavə suallarınız varsa, izah edə bilərəm**
        **Açıq və başa düşülən dildə izah et**
        
        **İstifadəçi yeni sual verir**
        **Sual**: ${question}
        **Hüquqi Məsləhətçi Cavabı**:


        Söhbət arxivi :
        ${isChathistory}
        `;

        const result = await this.sendRequestWithAi(prompt)
        return result

    }

    sendRequestWithAi = async (inputText) => {
        const model = this.genAi.getGenerativeModel({ model: "gemini-1.5-flash" })


        const stream = await model.generateContentStream(inputText)
        
        // for await(const chunk of result.stream) {
        //         fullResponse +=chunk.text()
        //         const chunkText = chunk.text()
        //         process.stdout.write(chunkText)
        // }
        return stream.stream
        }
}