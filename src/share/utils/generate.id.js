const crypto = require("crypto")

const generateUID = ()=>{

    const id = crypto.randomUUID()
    return id
}

module.exports = generateUID