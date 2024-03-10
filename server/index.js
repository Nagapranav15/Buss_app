const express=require('express')
const cors=require('cors')
const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')

const app=new express();
app.use(express.json());
//client is running in port 3000
//any third party application can be served, if the cors is enabled
app.use(cors());



const Client = new MongoClient('mongodb+srv://admin1:admin1@cluster0.3jtalg1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
Client.connect();


const db = Client.db("Bus_app")
const col = db.collection("User")

//from browser, the default url triggering is get method
//localhost:8081/home
//1st parementer is address and second parameter is service function
app.get('/home',(req,res)=> {
    res.send("Its home page - New Page - New 2 Page")
})

app.post('/insert',async (req,res) => {
    req.body.password=await bcrypt.hash(req.body.password,5)
    console.log(req.body);
    col.insertOne(req.body);
    res.send("Data Recieved");
})

app.post('/check',async (req,res) => {
    console.log(req.body)
    //you can give many key value pairs, every key and value is a condition
    //every key is a databse column name which will check for corresponding value
    var result = await col.findOne({"name":req.body.un})
    if(result!= null)
    {
        if(await bcrypt.compare(req.body.pw,result.password))
        {
            res.send(result);
        }
        else{
            res.send("Fail")
        }
    }
    else{
        res.send("Fail");
    }
})


app.get('/show',async (req, res)=> {
    var result = await col.find().toArray();
    console.log(result);
    res.send(result);
})

app.listen(8081);
console.log("Server Running");