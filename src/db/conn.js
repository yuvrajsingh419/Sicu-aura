const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/Sicu-aura",{
    
}).then(()=>{
    console.log(`Connection Sucessfull`)
}).catch((e)=>{
    console.log(`No Conenction`)
})