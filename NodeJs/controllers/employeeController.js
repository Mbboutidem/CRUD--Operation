const express = require('express');
let router = express.Router();
let ObjectId = require('mongoose').Types.ObjectId;

let {Employee} = require('../models/employee');
// => localhost://3000/employees/   *append the url*
router.get('/', (req, res) =>{
    Employee.find((err, docs) => {
        if(!err){res.send(docs);}
        else{console.log('Error in Retrieving Employees :' + JSON.stringify(err, undefined, 2));}
    });
});
//get request
router.get('/:id', (req, res) =>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with a given id :  ${req.params.id}`);
    //
    Employee.find((err, docs) => {
        if(!err){res.send(docs);}
        else{console.log('Error in Retrieving Employee Id :' + JSON.stringify(err, undefined, 2));}
    });
})

//post request
router.post('/', (req, res) => {
    let emp = new Employee ({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    })
    emp.save((err, doc) =>{
        if (!err) { res.send(doc);}
        else { console.log('Error in Employee Save : ' + JSON.stringify(err, undefined, 2)); }
    })
})
//update
router.put('/:id', (req, res) =>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with a given id :  ${req.params.id}`);
    //
    let emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    //new - true - the call back fuction will have the value of updated employee details
    Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true}, (err, doc) => {
        //check for error
        if (!err) { res.send(doc);}
        else { console.log('Error in Employee Save : ' + JSON.stringify(err, undefined, 2)); }
    });
})

//delete method
router.delete('/:id', (req, res) =>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with a given id :  ${req.params.id}`);
    //
    Employee.findByIdAndRemove((err, docs) => {
        if(!err){res.send(docs);}
        else{console.log('Error in Deleting Employee Id :' + JSON.stringify(err, undefined, 2));}
    });
})
//
module.exports = router;
