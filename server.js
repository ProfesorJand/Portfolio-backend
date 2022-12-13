const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const sendEmail = require("./server/utils/sendEmail.js");

const app = express();

//Middleware
app.use(express.json())
app.use(bodyparser.json())
app.use(cors())


//Routes
app.get("/",async (req,res)=>{
    res.json({"hola":"hi"})
})

app.get("/sendEmail", async (req,res)=>{
    res.json({"hola":"sendEmail"})
})

app.post("/sendEmail", async (req,res)=>{
    const {email, subject, emailMessage} = req.body;
    try {
        const send_to = process.env.EMAIL_USER;
        const sent_from = email;
        const reply_to = email;
        if(!subject){
            subject = `${email} Contact from Github Portfolio`
        }
        const message = `
            <h3>Email from: ${email}</h3>
            <p>Subject: ${subject}</p>
            <p>${emailMessage}</p>
        `
        await sendEmail(`${email} Contact from Github Portfolio`, message, send_to, sent_from, reply_to);
        res.status(200).json({success: true, message: "Email Sent"});
    } catch (error) {
        res.status(200).json({success: false, message: error.message})
        
    }

})

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}...`)
})
