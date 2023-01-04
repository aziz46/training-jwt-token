const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const app = express();

// Set up Global configuration access
dotenv.config();

app.post("/api/v1/generateToken", (req, res) => {
    
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
    
    const token = jwt.sign(data, jwtSecretKey);
    
        res.send(token);
});

app.get("/api/v1/getData", (req, res) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    
    try {
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            const fs = require('fs');

            let rawdata = fs.readFileSync('data.json');
            let datajson = JSON.parse(rawdata);
            return res.send(datajson);
        }else{
        // Access Denied
        return res.status(401).send(error);
    }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
        }
    });

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});