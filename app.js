const express=require('express')
const bodyParser=require('body-parser')
const mongoose= require('mongoose')
const ejs= require('ejs')
const app = express()
app.set('view engine' , 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://admin_Ramneek:Ramneek123@cluster0.cyzml.mongodb.net/GoGaga', {useNewUrlParser: true});

var Model = require('./models/model');

var mySearch=[]




// add name and location 

app.get('/'  ,function(req, res)
{
        Model.find({} , function(err, Items)
        {
            if(err)
            {
                console.log(err)
            }
            else
            {
                res.render('homePage' , {items: Items , Search :mySearch})
            }
        })

})
app.post('/create' , function(req , res)
{
    const newmodel=  new Model({

        location: req.body.location , 
        name  : req.body.name
    })
    newmodel.save()
    res.redirect('/')
})

app.post('/search' , function(req, res)
{
    mySearch=[]
    const search= req.body.search
    Model.findOne({name:search} , function(err, item)
    {
        if(err)
        {
            Model.findOne({location:search} , function(err, item)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    mySearch.push(item.name)
                    mySearch.push(item.location)
                        res.redirect('/')
                }
            })
        }
        else
        {
            mySearch.push(item.name)
            mySearch.push(item.location)
            console.log(mySearch)
                res.redirect('/')
        }
    })
})
app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  