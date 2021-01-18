const { Router } = require("express");
const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/",(req, res) =>{
    db.select('*')
    .from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(handleError)
})

server.get("/:id",(req, res) =>{
    
})

server.post("/",(req, res) =>{
    
})

server.put("/:id",(req, res) =>{
    
})

server.delete("/:id",(req, res) =>{
    
})

function handleError(error, res){
    console.log("error", error)
    res.status(500).json({message: error.message})
}
module.exports = server;
