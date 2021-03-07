const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema; 

const personSchema = new Schema ({
    name : {
        type : String,
        require:true,
        default:"My Name"
    }, 
    age : {
        type : Number,
        default: 0
    },
    favoriteFoods : {
        type:[String],
        default:[]
    }
})

module.exports = mongoose.model('person',personSchema)