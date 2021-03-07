const express = require('express')
const router = express.Router()
const person = require('../Models/personSchema')

//Create and Save a Record of a Model  @POST
router.post('/newperson', (req,res)=> {
 let newperson = new person(req.body)
 newperson.save((err,data)=> {
      err ? console.log(err) : res.send('Person was sended')
 })
})

//Create Many Records with model.create() @POST
router.post('/newpersons', (req,res) => {
    person.create(req.body ,(err,msg) => {
        err ? console.log(err) : res.send('Persons were sended')
    })
})

//Use model.find() to Search Your Database @GET 
router.get('/',(req,res) => {
    person.find({},(err,data)=>{
        err ? console.log(err) : res.json(data)
    })
})

//Use model.findOne() to Return a Single Matching Document from Your Database @GET 
router.get('/personbyfood/:favoriteFoods', (req,res)=> {
    person.findOne({favoriteFoods:req.params.favoriteFoods}, (err,data)=>{
        err ? console.log(err) : res.json(data)
    })
})

//Use model.findById() to Search Your Database By _id @GET 
router.get('/:id',(req,res)=> {
    person.findById({_id:req.params.id},(err,data)=> {
        err ? console.log(err) : res.json(data)
    })
})

//Perform Classic Updates by Running  @PUT 
router.put('/addhamburger/:id', (req,res)=>{
    person.findByIdAndUpdate({_id:req.params.id},{$push:{favoriteFoods:'hamburger'}},(err,msg)=> {
        err ? console.log(err) : res.json({msg:'Hamburger was added to the list of favorite food'})
    })
})

//Perform New Updates on a Document Using model.findOneAndUpdate() @PUT 
router.put('/updateage/:name', (req,res)=> {
    person.findOneAndUpdate({name:req.params.name},{$set:{age:20}},{ new: true } ,(err,msg)=>{
        err ? console.log(err) : res.json({msg:'The age was updated'})
    })
})

//Delete One Document Using model.findByIdAndRemove() @DELETE 
router.delete('/delete/:id', (req,res)=> {
    person.findByIdAndRemove({_id:req.params.id},(err,msg)=> {
        err ? console.log(err) : res.json({msg:'The person was deleted'})
    }) 
})

//MongoDB and Mongoose - Delete Many Documents with model.remove() @DELETE 
router.delete('/deleteMary',(req,res)=> {
    person.remove({name:"Mary"},(err,msg)=> {
        err ? console.log(err) : res.json({msg:"All persons have name Mary were removed"})
    })
})

//Chain Search Query Helpers to Narrow Search Results @GET 
router.get('/search/burrito', (req,res)=> {
    person.find({favoriteFoods:"burrito"}).sort({name:1}).limit(3).select({name: true,favoriteFoods:true}).exec()
        .then(data=>{
            res.json(data)
        .catch(err=>{
            console.error(err)
        })
    })
})

module.exports = router