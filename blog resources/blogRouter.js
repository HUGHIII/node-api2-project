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
     const newComment = {
        text:req.body.text,
        post_id:req.params.id
    } 
     !req.body.text ? res.status(400).json({message:'provide text'}) :
 
    blog.insertComment(newComment)
    .then(blg =>{
        //   !blg.id ? res.status(404).json({message:'no id'}):
          res.status(201).json(blg)
    })
    .catch(err=>({message:'error'}))
});// figure out how to test

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
   
    !req.params.id  ? res.status(404).json({message:'post doesnt exist'}): blog.findById(req.params.id) 
    .then(blg=>{
        console.log(blg,'blg')
       
        res.status(201).json(blg);
    })
    .catch(err=>{
        res.status(500).json({message:'unable to retrieve data'})
    })
});

router.get('/:id/comments',(req,res)=>{
    blog.findPostComments(req.params.id)
    
    .then(blg=>{
        console.log(blg,'blg')
        if (blg) {
            res.status(200).json(blg)
        }
    })
    .catch(err=>{
        res.status(500).json({message:'could not retrieve data'})
    })
})







  module.exports = router;