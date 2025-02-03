

const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 3333
const router = require("./moduls/routers")
const MongoConnection = require("./db/db")
app.use(express.json())
app.use(cors())
MongoConnection.connect()


app.use(router)





app.listen(PORT, () => {
    console.log(`server running port on ${PORT}`);
})  