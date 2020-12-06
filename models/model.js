const mongoose= require('mongoose')


const newModelSchema= new mongoose.Schema({

    location :String , 
    name : String

})
const Model = mongoose.model("Model" , newModelSchema)

module.exports = Model;
