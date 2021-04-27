const express = require('express')
const router = require('express').Router();
const logs = require('../models/log');
const validate = require('../middleware/validateSession')


router.post('/new-log', (req, res) => {
    logs.create({
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner_id: req.body.owner_id
    })
    .then(logs => res.status(200).json({ logs }))
    .catch(err => res.status(500).json({ message: 'Log not found', error: err}))
})

router.get('/log', (req, res) => {
    logs.findAll()
    .then(log => res.status(200).json({ log }))
    .catch(err => res.status(500).json({message: "No logs found", err}))
})

router.get('/log/:id', (req, res) => {
    logs.findOne({
        where: {
            owner_id: req.body.owner_id,
            id: req.params.id
        }
    })
    .then(logid => res.status(200).json({ logid }))
    .catch(err => res.status(500).json({message: "Log not found", err}))
})

//UPDATE LOG
router.put('/log/:id', validate, (req, res) => { 
    logs.update(req.body, { where: { id: req.params.id } })
    .then(updated => res.status(200).json({ message: `Successfully Updated logs ${req.params.id}`, updated}))
    .catch(err => res.status(500).json({message: "Update failed!", err}))
})

//DELETE LOG
router.delete('/log/:id', (req, res) => {
    logs.destroy( { where: { id: req.params.id } })
    .then(deleted => res.status(200).json({ message: { id: req.params.id }, deleted }))
    .catch(err => res.status(500).json({ message: 'Your log has been deleted', error: err}))

})

module.exports = router;