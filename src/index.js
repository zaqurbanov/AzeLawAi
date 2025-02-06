

const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 3333
const router = require("./moduls/routers")
const MongoConnection = require("./db/db")
const FaissService = require("./moduls/ai/faiss.service")
app.use(express.json())
app.use(cors())
MongoConnection.connect()

const faissService = new FaissService()


    // console.log("Faiss vektor bazasi yuklenir");

app.use(router)




app.listen(PORT, () => {
    console.log(`server running port on ${PORT}`);
})  