const express = require('express')
const db = require("../data/dbConfig.js");
const router = (express.Router())


router.get("/",(req, res) =>{
    db.select('*')
    .from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(handleError)
})

router.get("/:id",(req, res) =>{
    const {id} = req.params

    db.select('*')
    .from('accounts')
    .where("id", "=", id)
    .first()
    .then(account => {
        res.status(200).json({data: account})
    })
    .catch(handleError)
})

router.post("/", checkBody, (req, res) =>{
    const accountData = req.body
    db('accounts')
    .insert(accountData, "id")//always pass a second argument when you insert
    .then(accountids => {
        db('accounts')
        .where({id: accountids[0]})
        .first()
        .then(account => {
            res.status(200).json({data: account})
        })
    })
    .catch(handleError)
})

router.put("/:id", checkBody, (req, res) =>{
    const{id} = req.params
    const changes = req.body

    db('accounts')
    .from('accounts')
    .where({id})
    .update(changes)
    .then((count => {
        if(count > 0){
            res.status(200).json({data: `${count} record(s) successfully updated`})
        }else{
            res.status(404).json({message: 'there was no record to update'})
        }
    })).catch(handleError)
})

router.delete("/:id",(req, res) =>{
    const{id} = req.params

    db('accounts')
    .from('accounts')
    .where({id})
    .del()
    .then((count => {
        if(count > 0){
            res.status(200).json({data: `${count} record(s) successfully deleted`})
        }else{
            res.status(404).json({message: 'there was no record to delete'})
        }
    })).catch(handleError)
})

function handleError(error, res){
    console.log("error", error)
    res.status(500).json({message: error.message})
}

function checkBody(req, res, next){
    const {name, budget} = req.body

    if(name, budget){
        next()
    }else{
        res.status(400).json({message: 'please provide name and budget'})
    }
}

module.exports = router