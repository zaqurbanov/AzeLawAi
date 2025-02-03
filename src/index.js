

const express = require("express")
const app = express()
const PORT = 3333
const router = require("./moduls/routers")
const MongoConnection = require("./db/db")
app.use(express.json())
MongoConnection.connect()


app.use(router)





app.listen(PORT, () => {
    console.log(`server running port on ${PORT}`);
})  