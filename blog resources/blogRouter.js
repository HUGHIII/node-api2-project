const express = require('express'); //import express
const router = express.Router(); //creating router variable from framework

const blog = require('../data/db')



router.post('/',(req, res)=>{
    !req.body.title || !req.body.contents ? res.status(400).json({error:'please provide title and contents'}): blog.insert(req.body)
    .then(blg => {
        res.status(201).json(blg)
    })
    .catch(err => {
        res.status(500).json({message:'could not save data'})
    })
});

router.post('/:id/comments', (req,res)=> {
    !req.body.text ? res.status(400).json({message:'provide text'}) :
    blog.insertComment(req.body)
    .then(blg =>{
          !blg.id ? res.status(404).json({message:'no id'}):
          res.status(201).json(blg)
    })
});

router.get('/',(req,res)=>{
    blog.find(req.query)
    .then(blg => {
        res.status(201).json(blg)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message:'error retrieving data'})
    })
});


router.get('/:id',(req,res)=>{
    blog.findById(req.params.id)
    .then(blog=>{
        console.log(blog.id)
        blog.id === [] ? res.status(404).json({message:'post doesnt exist'}):
        res.status(201).json(blog);
    })
    .catch(err=>{
        res.status(500).json({message:'unable to retrieve data'})
    })
})







  module.exports = router;